import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Dish } from "./dish.schema";
import { DishType } from "./dish.constants";

@Injectable()
export class DishService {
  constructor(@InjectModel(Dish.name) private dishModel: Model<Dish>) {}

  async getAllDishesGroupedByType(): Promise<{ [key in DishType]?: Dish[] }> {
    const groupedDishes = await this.dishModel.aggregate([ //todo type
      {
        $group: {
          _id: "$type",
          dishes: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          dishes: 1,
        },
      },
    ]);

    const result: { [key in DishType]?: Dish[] } = {}; //todo remove
    groupedDishes.forEach((group) => {
      result[group.type] = group.dishes;
    });

    return result;
  }
}
