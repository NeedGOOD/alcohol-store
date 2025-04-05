import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Countries } from "src/enums/countries.enum";
import { TypeAlcohol } from "src/enums/typeAlcohol.enum";
import { Transform } from "class-transformer";

export class FilterAlcoholDto {
  @IsString()
  @IsOptional()
  item_code?: string;

  @IsString()
  @IsOptional()
  brand?: string | undefined;

  @IsEnum(Countries, { each: true })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  countries?: Countries[] | undefined;

  @IsEnum(TypeAlcohol, { each: true })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  type_alcohol?: TypeAlcohol[] | undefined;

  @IsNumber({ maxDecimalPlaces: 2 }, { each: true })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  volume?: number[] | undefined;

  @IsNumber({ maxDecimalPlaces: 2 }, { each: true })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  durability?: number[] | undefined;

  @IsBoolean()
  @IsOptional()
  availability?: boolean | undefined;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  cost?: number | undefined;

  @IsString()
  @IsOptional()
  description?: string | undefined;
}
