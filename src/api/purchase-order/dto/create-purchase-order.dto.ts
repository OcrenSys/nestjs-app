import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PurchaseOrderDetail } from '../../../database/models/purchase-order-detail.entity';

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
