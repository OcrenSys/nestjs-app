import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator';
import { PurchaseOrderDetail } from '../../../database/models/purchase-order-detail.entity';

export class CreatePurchaseOrderDto {
  @IsNumber()
  exchangeRate: number;

  @IsString()
  transactionDate: string;

  @IsString()
  @IsOptional()
  receptionDate: string;

  @IsArray()
  purchaseOrderDetails: PurchaseOrderDetail[];
}
