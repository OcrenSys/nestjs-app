import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PurchaseOrderDetail } from '../../../api/purchase-order-detail/entities/purchase-order-detail.entity';

export class CreatePurchaseOrderDto {
  @IsNumber()
  exchangeRate: number;

  @IsString()
  @IsOptional()
  transactionDate: string;

  @IsObject()
  @IsOptional()
  purchaseOrderDetail: PurchaseOrderDetail[];
}
