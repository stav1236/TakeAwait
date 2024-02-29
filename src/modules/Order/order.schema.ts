import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { OrderDetails } from "./order-details.interface";
import { ORDER_STATUS, OrderStatus } from "./order.constants";
import { Restaurant } from "../Restaurant/restaurant.schema";
import { Dish } from "../Dish/dish.schema";

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: Restaurant.name, required: true })
  restaurant: Types.ObjectId;

  @Prop({ required: true })
  customerId: string;

  @Prop({
    type: [{ dish: { type: Types.ObjectId, ref: Dish.name }, amount: Number }],
  })
  details: OrderDetails[];

  @Prop({ default: 0 })
  cost: number;

  @Prop({
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.paid,
  })
  status: OrderStatus;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
