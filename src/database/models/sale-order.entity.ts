import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../common/models/base.entity';
import { AdvertisingSource } from './advertising-source.entity';
import { DeliveryType } from './delivery-type.entity';
import { Customer } from './customer.entity';
import { PaymentType } from './payment-type.entity';
import { Authentication } from './authentication.entity';
import { SaleOrderDetail } from './sale-order-detail.entity';

@Entity()
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
