import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { AdvertisingSource } from 'src/api/advertising-source/entities/advertising-source.entity';
import { Customer } from 'src/api/customer/entities/customer.entity';
import { DeliveryType } from 'src/api/delivery-type/entities/delivery-type.entity';
import { PaymentType } from 'src/api/payment-type/entities/payment-type.entity';
import { SaleOrderDetail } from 'src/api/sale-order-detail/entities/sale-order-detail.entity';
import { Authentication } from 'src/authentication/entities/authentication.entity';
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
