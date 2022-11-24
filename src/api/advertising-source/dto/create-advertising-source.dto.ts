import { IsBoolean, IsString, MaxLength } from 'class-validator';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateAdvertisingSourceDto {
  @IsString()
  @MaxLength(NUMBER.N100, {
    message: `The Advertising Source's name must contain at least ${NUMBER.N100}`,
  })
  name: string;

  @IsBoolean()
  isActive: boolean;
}
