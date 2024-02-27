import { Controller, Get } from "@nestjs/common";

import { Restaurant } from "./restaurant.schema";
import { RestaurantService } from "./restaurant.service";

@Controller("restaurants")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }
}
