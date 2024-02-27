import { Dish } from "../Dish/dish.schema";

export interface OrderDetails {
  dish: Dish;
  amount: number;
}
