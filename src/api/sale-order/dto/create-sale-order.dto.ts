import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { AdvertisingSource } from '../../../database/models/advertising-source.entity';
import { Customer } from '../../../database/models/customer.entity';
import { DeliveryType } from '../../../database/models/delivery-type.entity';
import { PaymentType } from '../../../database/models/payment-type.entity';
import { SaleOrderDetail } from '../../../database/models/sale-order-detail.entity';
import { Authentication } from '../../../database/models/authentication.entity';
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
