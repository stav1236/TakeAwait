import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Dish } from "../Dish/dish.schema";
import { ORDER_STATUS, OrderStatus } from "./order.constants";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Dish.name) private dishModel: Model<Dish>
  ) {}

  async getAllOrders(): Promise<any[]> {
    return this.orderModel
      .find()
      .populate("details.dish")
      .select("-details._id")
      .exec();
  }

  async create(createOrderDto: CreateOrderDto) {
    const dishIds = createOrderDto.details.map((detail) => detail.dish);

    const fetchedDishes = await this.dishModel.find(
      { _id: { $in: dishIds } },
      { cost: 1 }
    );

    const priceMap = fetchedDishes.reduce((map, dish) => {
      map[dish._id] = dish.cost;
      return map;
    }, {});

    const totalCost = createOrderDto.details.reduce((acc, detail) => {
      const price = priceMap[detail.dish] ?? 0;
      return acc + price * detail.amount;
    }, 0);

    const orderData = { ...createOrderDto, cost: totalCost };

    const createdOrder = new this.orderModel(orderData);
    return await createdOrder.save();
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    if (status === ORDER_STATUS.arrived) {
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException("Order not found");
      }

      if (order.status === ORDER_STATUS.cancelled) {
        throw new BadRequestException("Invalid status transition");
      }
    }

    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }
}
