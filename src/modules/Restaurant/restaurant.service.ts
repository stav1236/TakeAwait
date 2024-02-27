import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Restaurant } from "./restaurant.schema";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().populate("dishes").exec();
  }
}
