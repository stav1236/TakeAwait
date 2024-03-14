import { Dish } from "../dish.schema";
import { DishType } from "./dish.enums";

export interface DishesByType {
  type: DishType;
  dishes: Dish[];
}
