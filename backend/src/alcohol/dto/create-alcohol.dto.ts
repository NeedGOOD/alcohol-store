import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Countries } from "src/enums/countries.enum";
import { TypeAlcohol } from "src/enums/typeAlcohol.enum";

export class CreateAlcoholDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsEnum(Countries)
  @IsNotEmpty()
  countries: Countries;

  @IsEnum(TypeAlcohol)
  @IsNotEmpty()
  type_alcohol: TypeAlcohol;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  volume: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  durability: number;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  cost: number;

  @IsString()
  @IsOptional()
  description?: string;
}
