import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SaleOrder } from 'src/api/sale-order/entities/sale-order.entity';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateAdvertisingSourceDto {
  @IsString()
  @MaxLength(NUMBER.N100, {
    message: `The Advertising Source's name must contain at least ${NUMBER.N100}`,
  })
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsObject()
  @IsOptional()
  saleOrder: SaleOrder;
}
