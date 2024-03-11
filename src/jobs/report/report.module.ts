import { Module } from "@nestjs/common";
import { ReportService } from "./report.service";
import { RestaurantModule } from "src/modules/Restaurant/restaurant.module";

@Module({
  imports: [RestaurantModule],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
