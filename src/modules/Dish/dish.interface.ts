import { Document } from "mongoose";
import { DishSchema } from "./dish.schema";

export type Dish = DishSchema & Document;
