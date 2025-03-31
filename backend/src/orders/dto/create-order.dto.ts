import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  total_price: number;
}
