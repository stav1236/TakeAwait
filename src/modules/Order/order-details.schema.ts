import { Schema, Prop } from "@nestjs/mongoose";

import { Dish } from "../Dish/dish.interface";
import { DishSchema } from "../Dish/dish.schema";

@Schema()
export class OrderDetailsSchema {
  @Prop({ type: [{ type: DishSchema }] })
  dish: Dish;

  @Prop()
  amount: number;
}
