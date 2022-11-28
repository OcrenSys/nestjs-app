import { Product } from '../../../api/product/entities/product.entity';
import { Column, Entity } from 'typeorm';
import { PurchaseOrder } from '../../../api/purchase-order/entities/purchase-order.entity';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class SaleOrderDetail extends Base {
  @Column()
  purchaseOrder: PurchaseOrder;

  @Column()
  product: Product;

  @Column()
  quantity: number;

  @Column()
  cost: number;

  @Column()
  shippingCost: number;
}
