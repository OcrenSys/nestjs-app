import { PurchaseOrderDetail } from './purchase-order-detail.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '../../common/models/base.entity';

@Entity()
export class PurchaseOrder extends Base {
  @Column()
  exchangeRate: number;

  @Column()
  transactionDate: string;

  @Column()
  receptionDate: string;

  @OneToMany(
    () => PurchaseOrderDetail,
    (purchaseOrderDetail) => purchaseOrderDetail.purchaseOrder,
    { cascade: true },
  )
  purchaseOrderDetails: PurchaseOrderDetail[];
}
