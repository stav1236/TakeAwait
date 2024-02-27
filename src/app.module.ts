import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { DishModule } from "./modules/Dish/dish.module";
import { RestaurantModule } from "./modules/Restaurant/restaurant.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/TakeAwait"),
    DishModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
