import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Order, OrderSchema } from "./order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { DishModule } from "../Dish/dish.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    DishModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
