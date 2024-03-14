import { Logger, Module } from "@nestjs/common";

import { ReportService } from "./report.service";
import { RestaurantModule } from "src/modules/Restaurant/restaurant.module";
import { OrderModule } from "src/modules/Order/order.module";

@Module({
  imports: [RestaurantModule, OrderModule],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
