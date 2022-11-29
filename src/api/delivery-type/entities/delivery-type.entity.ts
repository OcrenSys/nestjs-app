import { SaleOrder } from '../../../api/sale-order/entities/sale-order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class DeliveryType extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => SaleOrder, (saleOrder) => saleOrder.advertisingSource, {
    nullable: true,
  })
  saleOrder: SaleOrder;
}
