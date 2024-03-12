import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { DishType } from "./models/dish.enums";

@Schema({ collection: "dishes" })
export class Dish extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true, enum: DishType })
  type: DishType;

  @Prop({ default: Date.now })
  date: Date;
}

export const DishSchema = SchemaFactory.createForClass(Dish);
