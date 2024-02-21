import { Document } from "mongoose";

import { RestaurantSchema } from "./restaurant.schema";

export type Restaurant = RestaurantSchema & Document;
