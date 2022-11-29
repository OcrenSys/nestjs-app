import { SaleOrder } from '../../api/sale-order/entities/sale-order.entity';
import { ManyToMany, JoinTable, Column, Entity, ManyToOne } from 'typeorm';
import { Role } from '../../api/role/entities/role.entity';
import { Base } from '../../common/models/base.entity';

@Entity()
export class Authentication extends Base {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles?: Role[];

  @ManyToOne(() => SaleOrder, (saleOrder) => saleOrder.advertisingSource, {
    nullable: true,
  })
  saleOrder: SaleOrder;
}
