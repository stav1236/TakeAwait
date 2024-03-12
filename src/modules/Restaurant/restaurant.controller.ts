import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, ParseFloatPipe, Query } from "@nestjs/common";

import { Restaurant } from "./restaurant.schema";
import { RestaurantService } from "./restaurant.service";

@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll(
    @Query("latitude", ParseFloatPipe) latitude: number,
    @Query("longitude", ParseFloatPipe) longitude: number
  ): Promise<Restaurant[]> {
    return this.restaurantService.findAll(latitude, longitude);
  }
}
