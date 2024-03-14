import * as fs from "fs";
import { Types } from "mongoose";

import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { OrderService } from "src/modules/Order/order.service";
import { RestaurantService } from "src/modules/Restaurant/restaurant.service";
import { getDateWithTimeString } from "src/common/utilities/date-utils";

@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);

  constructor(
    private readonly orderService: OrderService,
    private readonly restaurantService: RestaurantService
  ) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async createFolder(): Promise<void> {
    const curDate = new Date();
    const timeString = getDateWithTimeString(curDate);
    const reportFolderName = `assets/reports/${timeString}`;
    const restaurantsNames: { _id: Types.ObjectId; name: string }[] =
      await this.restaurantService.getAllRestaurantsNames();

    try {
      fs.mkdirSync(reportFolderName, { recursive: true });

      await Promise.all(
        restaurantsNames.map(async (restaurant) => {
          try {
            const restaurantReportFileName = `${reportFolderName}/${restaurant.name}.json`;
            const orderData: RestaurantReport = await this.orderService.calcTodayOrdersReport(
              restaurant._id.toString(),
              curDate
            );

            fs.writeFileSync(restaurantReportFileName, JSON.stringify(orderData));
            this.logger.log(`File report "${restaurantReportFileName}" created successfully.`);
          } catch (error) {
            this.logger.error(`Error creating file: ${error}`);
          }
        })
      );
    } catch (error) {
      this.logger.error(`Error creating folder: ${error}`);
    }
  }
}
