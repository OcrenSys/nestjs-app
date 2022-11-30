import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { AdvertisingSource } from 'src/database/models/advertising-source.entity';
import { Customer } from 'src/database/models/customer.entity';
import { DeliveryType } from 'src/database/models/delivery-type.entity';
import { PaymentType } from 'src/database/models/payment-type.entity';
import { SaleOrderDetail } from 'src/database/models/sale-order-detail.entity';
import { Authentication } from 'src/database/models/authentication.entity';
export class CreateSaleOrderDto {
  @IsNumber()
  deliveryCharged: number;

  @IsNumber()
  receipNumber: number;

  @IsObject()
  @IsOptional()
  saleOrderDetail: SaleOrderDetail[];

  @IsObject()
  @IsOptional()
  advertisingSource: AdvertisingSource;

  @IsObject()
  @IsOptional()
  deliveryType: DeliveryType;

  @IsObject()
  @IsOptional()
  customer: Customer;

  @IsObject()
  @IsOptional()
  paymentType: PaymentType;

  @IsObject()
  @IsOptional()
  user: Authentication;
}
