import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import GeoLocation from "src/shared/models/GeoLocation";

import { Dish } from "../Dish/dish.interface";
import { DishSchema } from "../Dish/dish.schema";

@Schema()
export class RestaurantSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  geoLocation: GeoLocation;

  @Prop({ type: [{ type: DishSchema }] })
  dishes: Dish[];
}

export const RestaurantModel = SchemaFactory.createForClass(RestaurantSchema);
