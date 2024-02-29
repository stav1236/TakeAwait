import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Dish, DishSchema } from "./dish.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
})
export class DishModule {}
