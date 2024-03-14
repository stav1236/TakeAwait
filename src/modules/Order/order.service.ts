import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { Order } from "./order.schema";
import { OrderStatus } from "./models/order.enums";
import { DishService } from "../Dish/dish.service";
import { CreateOrderDto } from "./models/dto/create-order.dto";
import { OrderCreationDto } from "./models/dto/order-creation.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly dishService: DishService
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().populate("details.dish").exec();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const dishIds: string[] = createOrderDto.details.map((detail) => detail.dish);

    const dishesPrices: Record<string, number> = await this.dishService.getDishesPrices(dishIds);

    const totalCost: number = createOrderDto.details.reduce((acc, detail) => {
      const price: number = dishesPrices[detail.dish] ?? 0;
      return acc + price * detail.amount;
    }, 0);

    const orderData: OrderCreationDto = { ...createOrderDto, cost: totalCost };

    const createdOrder: Order = new this.orderModel(orderData);
    return await createdOrder.save();
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order: Order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException("Order not found");
    }

    if (status === OrderStatus.ARRIVED && order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException("Invalid status transition");
    }

    order.status = status;

    return await order.save();
  }

  async getOrdersByRestaurant(restaurantId: string): Promise<Order[]> {
    return await this.orderModel.find({ restaurant: restaurantId }).exec();
  }

  async getOrderStatus(id: string): Promise<OrderStatus> {
    const order: Order = await this.orderModel.findById(id, { status: 1 }).exec();

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order.status;
  }

  async getAmountOfOrders(restaurantId: string, startDate: Date, endDate: Date): Promise<number> {
    return await this.orderModel
      .countDocuments({
        restaurant: restaurantId,
        lastUpdated: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }

  async calcAvgCostOfOrder(restaurantId: string, startDate: Date, endDate: Date) {
    const aggregationResult = await this.orderModel
      .aggregate([
        {
          $match: {
            restaurant: restaurantId,
            lastUpdated: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: null,
            totalCost: { $sum: "$cost" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            averageCost: { $divide: ["$totalCost", "$count"] },
          },
        },
      ])
      .exec();

    if (aggregationResult.length > 0) {
      return aggregationResult[0].averageCost as number;
    } else {
      return 0;
    }
  }

  async getAmountOfCancelledOrders(
    restaurantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    return await this.orderModel
      .countDocuments({
        restaurant: restaurantId,
        lastUpdated: { $gte: startDate, $lte: endDate },
        status: OrderStatus.CANCELLED,
      })
      .exec();
  }

  async calcTodayOrdersReport(restaurantId: string, curDate: Date): Promise<RestaurantReport> {
    const startOfDay = new Date(curDate);
    startOfDay.setHours(0, 0, 0, 0);

    const ordersAmount: number = await this.getAmountOfOrders(restaurantId, startOfDay, curDate);
    const avgCost: number = await this.calcAvgCostOfOrder(restaurantId, startOfDay, curDate);
    const cancelledAmount: number = await this.getAmountOfCancelledOrders(
      restaurantId,
      startOfDay,
      curDate
    );

    return {
      ordersAmount,
      avgCost,
      cancelledAmount,
    };
  }
}
