import { PartialType } from "@nestjs/mapped-types";
import { CreateAlcoholDto } from "./create-alcohol.dto";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Countries } from "src/enums/countries.enum";
import { TypeAlcohol } from "src/enums/typeAlcohol.enum";

export class FilterAlcoholDto extends PartialType(CreateAlcoholDto) {
  @IsString()
  @IsOptional()
  item_code?: string;

  @IsString()
  @IsOptional()
  brand?: string | undefined;

  @IsEnum(Countries)
  @IsOptional()
  countries?: Countries | undefined;

  @IsEnum(TypeAlcohol)
  @IsOptional()
  type_alcohol?: TypeAlcohol | undefined;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  volume?: number | undefined;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  durability?: number | undefined;

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
