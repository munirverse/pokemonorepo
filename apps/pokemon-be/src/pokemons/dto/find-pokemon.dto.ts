import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  ValidateIf,
} from 'class-validator';

export class FindPokemonDto {
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(1)
  id: number;

  @IsOptional()
  @IsString()
  @Length(3)
  name: string;

  @IsOptional()
  @IsString()
  @Length(3)
  types: string;

  @IsOptional()
  @IsString()
  @Length(3)
  color: string;

  @IsOptional()
  @IsString()
  @Length(3)
  shape: string;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ value }) => Boolean(value), { toClassOnly: true })
  @IsBoolean()
  cursor: boolean;

  @ValidateIf((item) => item.cursor === true)
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(2)
  lastId: number;
}
