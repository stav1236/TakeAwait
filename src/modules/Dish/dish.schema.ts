import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { DISH_TYPE, DishType } from "./dish.constants";

@Schema()
export class DishSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true, enum: Object.values(DISH_TYPE) })
  type: DishType;

  @Prop({ default: Date.now })
  date: Date;
}

export const DishModel = SchemaFactory.createForClass(DishSchema);
