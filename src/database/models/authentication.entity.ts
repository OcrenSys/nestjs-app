import { SaleOrder } from './sale-order.entity';
import { ManyToMany, JoinTable, Column, Entity, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Base } from '../../common/models/base.entity';
import { Logger } from './logger.entity';

@Entity()
export class Authentication extends Base {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'users_roles' })
  roles?: Role[];

  @ManyToOne(() => SaleOrder, (saleOrder) => saleOrder.advertisingSource, {
    nullable: true,
  })
  saleOrder: SaleOrder;

  @ManyToOne(() => Logger, (logger) => logger.user, {
    nullable: true,
  })
  logger: Logger;
}
