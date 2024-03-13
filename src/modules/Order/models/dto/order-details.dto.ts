import { IsNotEmpty, IsInt, Min, IsMongoId } from "class-validator";

export class OrderDetailsDto {
  @IsMongoId()
  @IsNotEmpty()
  dish: string;

  @IsInt()
  @Min(1)
  amount: number;
}
