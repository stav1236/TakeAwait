import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import GeoLocation from "src/common/models/GeoLocation";

@Schema({ collection: "restaurants" })
export class Restaurant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Object, index: "2dsphere" })
  geoLocation: GeoLocation;

  @Prop({ type: [Types.ObjectId], ref: "Dish" })
  dishes: Types.ObjectId[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
