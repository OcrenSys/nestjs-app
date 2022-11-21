import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class Customer extends Base {
  @Column()
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
}
