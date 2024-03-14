import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Dish } from "./dish.schema";
import { DishesByType } from "./models/dishes-by-type.interface";

@Injectable()
export class DishService {
  constructor(@InjectModel(Dish.name) private dishModel: Model<Dish>) {}

  async getAllDishesGroupedByType(): Promise<DishesByType[]> {
    return await this.dishModel.aggregate<DishesByType>([
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
  }

  async getDishesPrices(dishIds: string[]): Promise<Record<string, number>> {
    const dishesPrices = await this.dishModel.find({ _id: { $in: dishIds } }, { cost: 1 });

    return dishesPrices.reduce((map, dish) => {
      map[dish._id] = dish.cost;
      return map;
    }, {});
  }
}
