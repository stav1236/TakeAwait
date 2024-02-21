import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { OrderDetails } from "./order-details.interface";
import { OrderDetailsSchema } from "./order-details.schema";
import { ORDER_STATUS, OrderStatus } from "./order.constants";

@Schema()
export class OrderSchema {
  @Prop({ type: String, ref: "Restaurant" })
  restaurantId: string;

  @Prop()
  customerId: string;

  @Prop({ type: [{ type: OrderDetailsSchema }] })
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

export const OrderModel = SchemaFactory.createForClass(OrderSchema);
