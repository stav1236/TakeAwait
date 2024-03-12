import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { Order } from "./order.schema";
import { OrderStatus } from "./models/order.enums";
import { DishService } from "../Dish/dish.service";
import { CreateOrderDto } from "./models/dto/create-order.dto";

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
    const dishIds = createOrderDto.details.map((detail) => detail.dish);

    const dishesPrices = this.dishService.getDishesPrices(dishIds);

    const totalCost = createOrderDto.details.reduce((acc, detail) => {
      const price = dishesPrices[detail.dish] ?? 0;
      return acc + price * detail.amount;
    }, 0);

    const orderData = { ...createOrderDto, cost: totalCost };

    const createdOrder = new this.orderModel(orderData);
    return await createdOrder.save();
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    if (status === OrderStatus.ARRIVED && order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException("Invalid status transition");
    }

    return await order.save();
  }

  async getOrdersByRestaurant(restaurantId: string): Promise<Order[]> {
    return await this.orderModel.find({ restaurant: restaurantId }).exec();
  }

  async getOrderStatus(id: string): Promise<OrderStatus> {
    const order = await this.orderModel.findById(id, { status: 1 }).exec();

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

  async calcTodayOrdersReport(
    restaurantId: string,
    curDate: Date
  ): Promise<{
    ordersAmount: number;
    avgCost: any;
    cancelledAmount: number;
  }> {
    const startOfDay = new Date(curDate);
    startOfDay.setHours(0, 0, 0, 0);

    const ordersAmount = await this.getAmountOfOrders(restaurantId, startOfDay, curDate);
    const avgCost = await this.calcAvgCostOfOrder(restaurantId, startOfDay, curDate);
    const cancelledAmount = await this.getAmountOfCancelledOrders(
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
