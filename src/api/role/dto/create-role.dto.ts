import { IsBoolean, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/roles.enum';

export class CreateRoleDto {
  @IsString()
  name: RoleEnum;

  @IsBoolean()
  isActive: boolean;
}
