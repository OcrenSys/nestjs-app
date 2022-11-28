import { IsDate, IsNumber } from 'class-validator';
export class CreateSaleOrderDto {
  @IsDate()
  transactionDate: string;

  @IsNumber()
  exchangeRate: number;
}
