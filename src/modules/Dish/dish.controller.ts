import { ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";

import { DishService } from "./dish.service";
import { DishesByType } from "./models/dishes-by-type.interface";

@ApiTags("Dishes")
@Controller("dishes")
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getAllDishesGroupedByType(): Promise<DishesByType[]> {
    return this.dishService.getAllDishesGroupedByType();
  }
}
