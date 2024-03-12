import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { OrderService } from "src/modules/Order/order.service";
import { RestaurantService } from "src/modules/Restaurant/restaurant.service";
import { getDateWithTimeString } from "src/common/utilities/dataUtils";

@Injectable()
export class ReportService {
  constructor(
    private readonly orderService: OrderService,
    private readonly restaurantService: RestaurantService
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async createFolder(): Promise<void> {
    const curDate = new Date();
    const timeString = getDateWithTimeString(curDate);
    const reportFolderName = `assets/reports/${timeString}`;
    const restaurantsNames = await this.restaurantService.getAllRestaurantsNames();

    try {
      fs.mkdirSync(reportFolderName, { recursive: true });

      await Promise.all(
        restaurantsNames.map(async (restaurant) => {
          try {
            const restaurantReportFileName = `${reportFolderName}/${restaurant.name}.json`;
            const orderData = await this.orderService.calcTodayOrdersReport(
              restaurant._id.toString(),
              curDate
            );

            fs.writeFileSync(restaurantReportFileName, JSON.stringify(orderData));
            console.log(`File report "${restaurantReportFileName}" created successfully.`);
          } catch (error) {
            console.error(`Error creating file: ${error}`);
          }
        })
      );
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
    }
  }
}
