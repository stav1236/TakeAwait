import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Restaurant } from "./restaurant.schema";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>
  ) {}

  async findAll(latitude: number, longitude: number): Promise<Restaurant[]> {
    return this.restaurantModel
      .find({
        geoLocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [latitude, longitude],
            },
          },
        },
      })
      .populate("dishes")
      .exec();
  }

  async getAllRestaurantsNames(): Promise<{ _id: Types.ObjectId; name: string }[]> {
    return await this.restaurantModel.find({}, { name: 1 });
  }
}
