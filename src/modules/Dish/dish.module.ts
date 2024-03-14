import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Dish, DishSchema } from "./dish.schema";
import { DishService } from "./dish.service";
import { DishController } from "./dish.controller";

@Module({
  providers: [DishService],
  controllers: [DishController],
  imports: [MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }])],
  exports: [DishService],
})
export class DishModule {}
