import { IsNumber, IsObject, Min } from 'class-validator';
import { Product } from '../../../api/product/entities/product.entity';
import { PurchaseOrder } from '../../../api/purchase-order/entities/purchase-order.entity';
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
    message: `The Sale Order Detail's shipping cost must be greater than ${NUMBER.N00}`,
  })
  shippingCost: number;

  @IsObject()
  purchaseOrder: PurchaseOrder;

  @IsObject()
  product: Product;
}
