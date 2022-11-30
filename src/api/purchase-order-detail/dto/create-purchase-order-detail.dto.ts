import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { Product } from 'src/database/models/product.entity';
import { PurchaseOrder } from 'src/database/models/purchase-order.entity';

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
