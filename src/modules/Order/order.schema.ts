import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { OrderDetails } from "./order-details.interface";
import { ORDER_STATUS, OrderStatus } from "./order.constants";

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: "Restaurant" })
  restaurant: Types.ObjectId;

  @Prop()
  customerId: string;

  @Prop({
    type: [{ dish: { type: Types.ObjectId, ref: "Dish" }, amount: Number }],
  })
  details: OrderDetails[];

  @Prop()
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
