import { IsBoolean, IsString, MaxLength } from 'class-validator';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateDeliveryTypeDto {
  @IsString()
  @MaxLength(NUMBER.N100, {
    message: `The Delivery Type's name must contain at least ${NUMBER.N100}`,
  })
  name: string;

  @IsBoolean()
  isActive: boolean;
}
