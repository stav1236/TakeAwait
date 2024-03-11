import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { DishModule } from "./modules/Dish/dish.module";
import { RestaurantModule } from "./modules/Restaurant/restaurant.module";

import config from "src/common/config/configuration";
import { OrderModule } from "./modules/Order/order.module";
import { ReportModule } from "./jobs/report/report.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    OrderModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
