import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Product } from 'src/api/product/entities/product.entity';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateBrandDto {
  @IsString()
  @MaxLength(NUMBER.N20, {
    message: `The Brand's description must contain at least ${NUMBER.N20} characters.`,
  })
  description: string;

  @IsObject()
  @IsOptional()
  products: Product[];

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
