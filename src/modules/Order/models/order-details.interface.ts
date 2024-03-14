import { Types } from "mongoose";

export interface OrderDetails {
  dish: Types.ObjectId;
  amount: number;
}
