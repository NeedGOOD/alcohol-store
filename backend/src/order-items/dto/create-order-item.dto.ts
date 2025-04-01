import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderItemDto {
  @IsInt()
  @IsNotEmpty()
  alcohol_id: number;

  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;
}
