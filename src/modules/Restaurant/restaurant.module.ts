import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Restaurant, RestaurantSchema } from "./restaurant.schema";
import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";

@Module({
  providers: [RestaurantService],
  controllers: [RestaurantController],
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  exports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
})
export class RestaurantModule {}
