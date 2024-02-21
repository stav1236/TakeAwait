import { Document } from "mongoose";

import { OrderSchema } from "./order.schema";

export type Order = OrderSchema & Document;
