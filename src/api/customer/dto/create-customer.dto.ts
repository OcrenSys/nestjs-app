import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateCustomerDto {
  @IsString()
  @MaxLength(NUMBER.N40, {
    message: `The Customer's name must contain at least ${NUMBER.N40} characters.`,
  })
  name: string;

  @IsString()
  @MaxLength(NUMBER.N40, {
    message: `The Customer's lastName must contain at least ${NUMBER.N40} characters.`,
  })
  lastName: string;

  @IsString()
  @MaxLength(NUMBER.N20, {
    message: `The Customer's phone must contain at least ${NUMBER.N20} characters.`,
  })
  phone: string;

  @IsString()
  @MaxLength(NUMBER.N100, {
    message: `The Customer's email must contain at least ${NUMBER.N100} characters.`,
  })
  email: string;

  @IsString()
  @MaxLength(NUMBER.N250, {
    message: `The Customer's address must contain at least ${NUMBER.N250} characters.`,
  })
  address: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
