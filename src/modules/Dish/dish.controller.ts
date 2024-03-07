import { ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";

import { Dish } from "./dish.schema";
import { DishType } from "./dish.constants";
import { DishService } from "./dish.service";

@ApiTags("Dishes")
@Controller("dishes")
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getAllDishesGroupedByType(): Promise<{ [key in DishType]?: Dish[] }> {
    return this.dishService.getAllDishesGroupedByType();
  }
}
