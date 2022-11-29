import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import { AdvertisingSource } from '../../../api/advertising-source/entities/advertising-source.entity';
import { DeliveryType } from '../../../api/delivery-type/entities/delivery-type.entity';
import { Customer } from '../../../api/customer/entities/customer.entity';
import { PaymentType } from '../../../api/payment-type/entities/payment-type.entity';
import { Authentication } from '../../../authentication/entities/authentication.entity';
import { SaleOrderDetail } from '../../../api/sale-order-detail/entities/sale-order-detail.entity';

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
