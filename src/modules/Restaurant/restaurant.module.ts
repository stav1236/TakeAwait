import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { RestaurantSchema } from "./restaurant.schema";
import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Restaurant", schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
