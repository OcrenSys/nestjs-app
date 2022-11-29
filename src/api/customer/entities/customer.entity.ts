import { SaleOrder } from '../../../api/sale-order/entities/sale-order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class Customer extends Base {
  @Column({ length: 40 })
  name: string;

  @Column({ length: 40 })
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => SaleOrder, (saleOrder) => saleOrder.advertisingSource, {
    nullable: true,
  })
  saleOrder: SaleOrder;
}
