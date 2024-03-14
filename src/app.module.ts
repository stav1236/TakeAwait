import { ScheduleModule } from "@nestjs/schedule";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { DishModule } from "./modules/Dish/dish.module";
import { RestaurantModule } from "./modules/Restaurant/restaurant.module";

import config from "src/common/config/configuration";
import { OrderModule } from "./modules/Order/order.module";
import { ReportModule } from "./jobs/report/report.module";
import { RequestLoggingMiddleware } from "./common/middlewares/request-logging.middleware";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `.env.${process.env.NODE_ENV}`,
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
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes("*");
  }
}
