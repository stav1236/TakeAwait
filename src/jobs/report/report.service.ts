import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron, CronExpression } from "@nestjs/schedule";
import * as fs from "fs";
import { Model } from "mongoose";
import { Restaurant } from "src/modules/Restaurant/restaurant.schema";

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>
  ) {}

  @Cron("*/30 * * * * *")
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
    const restaurantsNames = await this.restaurantModel.find({}, { _id: 0, name: 1 });

    restaurantsNames.forEach((restaurant) => {
      try {
        const restaurantReportFolderName = `${reportFolderName}/${restaurant.name}`;
        // fs.mkdirSync(restaurantReportFolderName, { recursive: true });
        console.log(`Folder "${restaurantReportFolderName}" created successfully.`);
      } catch (error) {
        console.error(`Error creating folder: ${error}`);
      }
    });
  }
}
