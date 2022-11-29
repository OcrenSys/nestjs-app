import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import * as NUMBER from '../../../common/constants/number.contants';
import { SaleOrder } from '../../../api/sale-order/entities/sale-order.entity';

@Entity()
export class AdvertisingSource extends Base {
  @Column({ length: NUMBER.N100, nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => SaleOrder, (saleOrder) => saleOrder.advertisingSource, {
    nullable: true,
  })
  saleOrder: SaleOrder;
}
