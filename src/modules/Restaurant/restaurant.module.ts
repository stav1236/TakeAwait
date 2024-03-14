import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";
import { Restaurant, RestaurantSchema } from "./restaurant.schema";

@Module({
  providers: [RestaurantService],
  controllers: [RestaurantController],
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  exports: [RestaurantService],
})
export class RestaurantModule {}
