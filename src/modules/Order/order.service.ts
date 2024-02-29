import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./order.schema";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getAllOrders(): Promise<any[]> {
    return this.orderModel
      .find()
      .populate("details.dish")
      .select("-details._id")
      .exec();
  }
}
