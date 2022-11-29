import { Base } from '../../../common/models/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { SaleOrder } from '../../../api/sale-order/entities/sale-order.entity';

@Entity()
export class PaymentType extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => SaleOrder, (saleOrder) => saleOrder.advertisingSource, {
    nullable: true,
  })
  saleOrder: SaleOrder;
}
