import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { DishModule } from "./modules/Dish/dish.module";
import { RestaurantModule } from "./modules/Restaurant/restaurant.module";

import config from "src/common/config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.url"),
      }),
      inject: [ConfigService],
    }),
    DishModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
