import * as fs from "fs";
import { Model } from "mongoose";

import { Cron, CronExpression } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Restaurant } from "src/modules/Restaurant/restaurant.schema";
import { RestaurantService } from "src/modules/Restaurant/restaurant.service";

@Injectable()
export class ReportService {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async createFolder(): Promise<void> {
    const timestamp = new Date()
      .toLocaleString("he-IL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/:/g, "-");

    const reportFolderName = `assets/reports/${timestamp}`;

    const restaurantsNames = await this.restaurantService.getAllRestaurantsNames();

    try {
      // fs.mkdirSync(reportFolderName, { recursive: true });

      restaurantsNames.forEach((restaurant) => {
        try {
          const restaurantReportFileName = `${reportFolderName}/${restaurant.name}.json`;
          const jsonData = JSON.stringify({
            ordersAmount: 999,
            avgCost: 999,
            cancelsAmount: 999,
          });

          // fs.writeFileSync(restaurantReportFileName, jsonData);
          console.log(`file report "${restaurantReportFileName}" created successfully.`);
        } catch (error) {
          console.error(`Error creating file: ${error}`);
        }
      });
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
    }
  }
}
