import { RoleEnum } from '../../../common/enums/roles.enum';
import { Base } from '../../../common/models/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Authentication } from '../../../authentication/entities/authentication.entity';
@Entity()
export class Role extends Base {
  @Column({ default: RoleEnum.User })
  name: RoleEnum;

  @ManyToMany(() => Authentication, (user) => user.roles)
  users?: Authentication[];
}
