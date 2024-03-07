import { ApiProperty } from "@nestjs/swagger";
import { Dish } from "src/modules/Dish/dish.schema";

export class CreateOrderDto {
  @ApiProperty({
    description: "The ID of the customer who is placing the order",
    example: "1234567890",
  })
  customerId: string;

  @ApiProperty({
    type: [Object],
    description: "An array containing details of each dish in the order",
    example: [
      { dish: "65dda763a21179b83293aa50", amount: 2 },
      { dish: "65dda763a21179b83293aa51", amount: 1 },
    ],
  })
  details: { dish: string; amount: number }[];

  @ApiProperty({
    description:
      "The ID of the restaurant from which the order is being placed",
    example: "65ddad2ea21179b83293aa6a",
  })
  restaurant: string;
}
