import { IsNumber, IsObject, IsOptional, Min } from 'class-validator';
import { SaleOrder } from '../../../database/models/sale-order.entity';
import { Product } from '../../../database/models/product.entity';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateSaleOrderDetailDto {
  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Sale Order Detail's quantity must be greater than ${NUMBER.N00}`,
  })
  quantity: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Sale Order Detail's cost must be greater than ${NUMBER.N00}`,
  })
  cost: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Sale Order Detail's price must be greater than ${NUMBER.N00}`,
  })
  price: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Sale Order Detail's exchangeRate must be greater than ${NUMBER.N00}`,
  })
  exchangeRate: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `The Sale Order Detail's shipping cost must be greater than ${NUMBER.N00}`,
  })
  shippingCost: number;

  @IsObject()
  @IsOptional()
  saleOrder: SaleOrder;

  @IsObject()
  @IsOptional()
  product: Product;
}
