import { IsBoolean, IsString, MaxLength } from 'class-validator';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateAdvertisingSourceDto {
  @IsString()
  @MaxLength(NUMBER.N100, {
    message: `The name of the advertizing had been at least ${NUMBER.N100}`,
  })
  name: string;

  @IsBoolean()
  isActive: boolean;
}
