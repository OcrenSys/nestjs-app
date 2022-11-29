import { IsDate, IsNumber, IsObject, IsOptional } from 'class-validator';
import { SaleOrderDetail } from 'src/api/sale-order-detail/entities/sale-order-detail.entity';
export class CreateSaleOrderDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  cost: number;

  @IsDate()
  transactionDate: string;

  @IsNumber()
  exchangeRate: number;

  @IsObject()
  @IsOptional()
  saleOrderDetail: SaleOrderDetail;
}
