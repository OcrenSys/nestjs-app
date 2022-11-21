import { ManyToMany, JoinTable, Column, Entity } from 'typeorm';
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
}
