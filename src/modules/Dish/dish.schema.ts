import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { DISH_TYPE, DishType } from "./dish.constants";

@Schema({ collection: "dishes" })
export class Dish extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true, enum: Object.values(DISH_TYPE) })
  type: DishType;

  @Prop({ default: Date.now })
  date: Date;
}

export const DishSchema = SchemaFactory.createForClass(Dish);
