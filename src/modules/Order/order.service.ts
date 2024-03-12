import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { Order } from "./order.schema";
import { DishService } from "../Dish/dish.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ORDER_STATUS, OrderStatus } from "./order.constants";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly dishService: DishService
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().populate("details.dish").exec();
  }

  async create(createOrderDto: CreateOrderDto) {
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
    if (status === ORDER_STATUS.arrived) {
      const order = await this.orderModel.findById(id); //todo

      if (!order) {
        throw new NotFoundException("Order not found");
      }

      if (order.status === ORDER_STATUS.cancelled) {
        throw new BadRequestException("Invalid status transition");
      }
    }

    const order = await this.orderModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }

  async getOrdersByRestaurant(restaurantId: string): Promise<Order[]> {
    const orders = await this.orderModel.find({ restaurant: restaurantId }).exec();

    return orders;
  }

  async getOrderStatus(id: string): Promise<OrderStatus> {
    const order = await this.orderModel.findById(id).exec(); //todo

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order.status;
  }

  async getAmountOfOrdersToDay(restaurantId: string, curDate: Date): Promise<number> {
    const startOfDay = new Date(curDate); //todo change funcation name
    startOfDay.setHours(0, 0, 0, 0);

    const count = await this.orderModel
      .countDocuments({
        restaurant: restaurantId,
        lastUpdated: { $gte: startOfDay, $lte: curDate },
      })
      .exec();

    return count;
  }

  async calcAvgCostOfOrderToDay(restaurantId: string, curDate: Date) {
    const startOfDay = new Date(curDate);
    startOfDay.setHours(0, 0, 0, 0);

    const aggregationResult = await this.orderModel
      .aggregate([
        {
          $match: {
            restaurant: restaurantId,
            lastUpdated: { $gte: startOfDay, $lte: curDate },
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
      return aggregationResult[0].averageCost;
    } else {
      return 0;
    }
  }

  async getAmountOfCancelledOrdersToDay(restaurantId: string, curDate: Date): Promise<number> {
    const startOfDay = new Date(curDate);
    startOfDay.setHours(0, 0, 0, 0);

    const count = await this.orderModel
      .countDocuments({
        restaurant: restaurantId,
        lastUpdated: { $gte: startOfDay, $lte: curDate },
        status: ORDER_STATUS.cancelled,
      })
      .exec();

    return count;
  }
  async calcTodayOrdersReport(restaurantId: string, curDate: Date) {
    const ordersAmount = await this.getAmountOfOrdersToDay(restaurantId, curDate);
    const avgCost = await this.calcAvgCostOfOrderToDay(restaurantId, curDate);
    const cancelledAmount = await this.getAmountOfCancelledOrdersToDay(restaurantId, curDate);

    return {
      ordersAmount,
      avgCost,
      cancelledAmount,
    };
  }
}
