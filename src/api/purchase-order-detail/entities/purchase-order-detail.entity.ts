import { Product } from '../../../api/product/entities/product.entity';
import { PurchaseOrder } from '../../../api/purchase-order/entities/purchase-order.entity';
import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class PurchaseOrderDetail extends Base {
  @Column()
  shippingCost: number;

  @ManyToOne(
    () => PurchaseOrder,
    (purchaseOrder) => purchaseOrder.purchaseOrderDetail,
    { nullable: true },
  )
  purchaseOrder: PurchaseOrder;

  @OneToOne(() => Product, (product) => product.purchaseOrderDetail)
  product: Product;
}
