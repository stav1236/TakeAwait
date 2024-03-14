import { CreateOrderDto } from "./create-order.dto";

export class OrderCreationDto extends CreateOrderDto {
  cost: number;
}
