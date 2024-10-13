import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  ValidationOptions,
  ValidationArguments,
  registerDecorator,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

function IsLastIdValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsLastIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(lastIdValue: any, args: ValidationArguments) {
          const cursorValue = (args.object as any).cursor;

          if (cursorValue === true) {
            // When cursor is true, lastId must be provided
            return lastIdValue != null;
          } else {
            // When cursor is false or undefined, lastId must not be provided
            return lastIdValue == null;
          }
        },

        defaultMessage(args: ValidationArguments) {
          const cursorValue = (args.object as any).cursor;
          if (cursorValue === true) {
            return 'lastId must be provided when cursor is true.';
          } else {
            return 'lastId must not be provided when cursor is false or not initialized.';
          }
        },
      },
    });
  };
}
export class FindPokemonDto {
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(1)
  @ApiProperty({
    required: false,
    description: 'pokemon id (ex: 1, 2, .etc)',
    minimum: 1,
  })
  id: number;

  @IsOptional()
  @IsString()
  @Length(1)
  @ApiProperty({
    required: false,
    description: 'pokemon name (ex: pikachu, bulbasaur, .etc)',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Length(3)
  @ApiProperty({
    required: false,
    description: 'pokemon type (ex: electric, grass, .etc)',
    minimum: 3,
  })
  types: string;

  @IsOptional()
  @IsString()
  @Length(3)
  @ApiProperty({
    required: false,
    description: 'pokemon color (ex: yellow, green, .etc)',
    minimum: 3,
  })
  color: string;

  @IsOptional()
  @IsString()
  @Length(3)
  @ApiProperty({
    required: false,
    description: 'pokemon shape (ex: quadruped, armor, .etc',
    minimum: 3,
  })
  shape: string;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, description: 'number of page', minimum: 1 })
  page: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, description: 'size per page', minimum: 1 })
  limit: number;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === 'false' ? value === 'true' : value
  )
  @IsBoolean()
  @ApiProperty({
    required: false,
    description: 'enable pagination cursor mode',
  })
  cursor: boolean;

  @ValidateIf(
    (item) =>
      item.cursor === true ||
      (item.lastId !== undefined && item.lastId !== null)
  )
  @IsLastIdValid()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(2)
  @ApiProperty({
    required: false,
    description: 'cursor id (required if cursor mode was on)',
    minimum: 2,
  })
  lastId: number;
}
