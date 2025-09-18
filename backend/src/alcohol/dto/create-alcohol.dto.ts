import { Transform } from "class-transformer";
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
  @Transform(({ value }) => Number(value))
  volume: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  durability: number;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  cost: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  file?: string;
}
