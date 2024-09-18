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
  id: number;

  @IsOptional()
  @IsString()
  @Length(1)
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
  @Transform(({ value }) =>
    value === 'true' || value === 'false' ? value === 'true' : value
  )
  @IsBoolean()
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
  lastId: number;
}
