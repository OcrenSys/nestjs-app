import { Base } from '../../../common/models/base.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class DeliveryType extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
