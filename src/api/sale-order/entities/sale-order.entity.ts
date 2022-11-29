import { Column, OneToMany } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import { AdvertisingSource } from 'src/api/advertising-source/entities/advertising-source.entity';
import { DeliveryType } from 'src/api/delivery-type/entities/delivery-type.entity';
import { Customer } from 'src/api/customer/entities/customer.entity';
import { PaymentType } from 'src/api/payment-type/entities/payment-type.entity';
import { Authentication } from 'src/authentication/entities/authentication.entity';
import { SaleOrderDetail } from 'src/api/sale-order-detail/entities/sale-order-detail.entity';

export class SaleOrder extends Base {
  @Column()
  deliveryCharged: number;

  @Column()
  receipNumber: number;

  @OneToMany(
    () => SaleOrderDetail,
    (saleOrderDetail) => saleOrderDetail.saleOrder,
    { nullable: true },
  )
  saleOrderDetail: SaleOrderDetail[];

  @OneToMany(
    () => AdvertisingSource,
    (advertisingSource) => advertisingSource.saleOrder,
    { nullable: true },
  )
  advertisingSource: AdvertisingSource;

  @OneToMany(() => DeliveryType, (deliveryType) => deliveryType.saleOrder, {
    nullable: true,
  })
  deliveryType: DeliveryType;

  @OneToMany(() => Customer, (customer) => customer.saleOrder, {
    nullable: true,
  })
  customer: Customer;

  @OneToMany(() => PaymentType, (paymentType) => paymentType.saleOrder, {
    nullable: true,
  })
  paymentType: PaymentType;

  @OneToMany(
    () => Authentication,
    (authentication) => authentication.saleOrder,
    {
      nullable: true,
    },
  )
  user: Authentication;
}
