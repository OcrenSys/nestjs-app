import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { Product } from 'src/api/product/entities/product.entity';
import { PurchaseOrder } from 'src/api/purchase-order/entities/purchase-order.entity';

export class CreatePurchaseOrderDetailDto {
  @IsNumber()
  shippingCost: number;

  @IsObject()
  @IsOptional()
  purchaseOrder: PurchaseOrder;

  @IsObject()
  @IsOptional()
  product: Product;
}
