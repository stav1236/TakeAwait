export class CreateOrderDto {
  customerId: string;
  details: {
    dish: string;
    amount: number;
  }[];
  restaurant: string;
}
