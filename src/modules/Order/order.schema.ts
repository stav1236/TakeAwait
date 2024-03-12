import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Dish } from "../Dish/dish.schema";
import { OrderStatus } from "./models/order.enums";
import { Restaurant } from "../Restaurant/restaurant.schema";
import { OrderDetails } from "./models/order-details.interface";

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: Restaurant.name, required: true })
  restaurant: Types.ObjectId;

  @Prop({ required: true })
  customerId: string;

  @Prop({
    type: [
      {
        _id: false,
        dish: { type: Types.ObjectId, ref: Dish.name },
        amount: Number,
      },
    ],
  })
  details: OrderDetails[];

  @Prop({ default: 0 })
  cost: number;

  @Prop({
    enum: OrderStatus,
    default: OrderStatus.PAID,
  })
  status: OrderStatus;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
