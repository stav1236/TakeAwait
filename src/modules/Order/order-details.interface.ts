import { Dish } from "../Dish/dish.interface";

export interface OrderDetails {
  dish: Dish;
  amount: number;
}
