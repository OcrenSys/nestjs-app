import { Product } from './product.entity';
import { PurchaseOrder } from './purchase-order.entity';
import { Entity, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../../common/models/base.entity';

@Entity()
export class PurchaseOrderDetail extends Base {
  @Column()
  shippingCost: number;

  @ManyToOne(
    () => PurchaseOrder,
    (purchaseOrder) => purchaseOrder.purchaseOrderDetails,
    { onDelete: 'CASCADE' },
  )
  purchaseOrder: PurchaseOrder;

  @OneToOne(() => Product, (product) => product.purchaseOrderDetail, {
    eager: true,
  })
  @JoinColumn()
  product: Product;
}
