import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Brand } from '../../../database/models/brand.entity';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateProductDto {
  @IsString()
  @MaxLength(NUMBER.N100, {
    message: `The Product's ASSIN must contain less than ${NUMBER.N100} characters.`,
  })
  description: string;

  @IsString()
  @MaxLength(NUMBER.N12, {
    message: `The Product's name must contain less than ${NUMBER.N12} characters.`,
  })
  assin: string;

  @IsString()
  @MaxLength(NUMBER.N500, {
    message: `The Product's link must contain less than ${NUMBER.N500} characters.`,
  })
  link: string;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Product's weight must be greater than ${NUMBER.N00}`,
  })
  weight: number;

  @IsString()
  @MaxLength(NUMBER.N12, {
    message: `The Product's dimensions must contain less than ${NUMBER.N12} characters.`,
  })
  dimensions: string;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Product's cost must be greater than ${NUMBER.N00}`,
  })
  cost: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Product's store-price must be greater than ${NUMBER.N00}`,
  })
  storePrice: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Product's office-price must be greater than ${NUMBER.N00}`,
  })
  officePrice: number;

  @IsBoolean()
  isActive: boolean;

  @IsObject()
  @IsOptional()
  brand: Brand;
}
