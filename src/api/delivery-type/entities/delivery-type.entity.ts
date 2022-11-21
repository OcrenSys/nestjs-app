import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class DeliveryType extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
