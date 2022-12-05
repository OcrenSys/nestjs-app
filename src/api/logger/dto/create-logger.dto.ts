import { IsObject, IsOptional, IsString, MaxLength } from 'class-validator';
import { Authentication } from '../../../database/models/authentication.entity';
import * as NUMBER from '../../../common/constants/number.contants';

export class CreateLoggerDto {
  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  @MaxLength(NUMBER.MAX, {
    message: `The Logger's headers must contain at least ${NUMBER.MAX}`,
  })
  headers?: string;

  @IsString()
  @IsOptional()
  @MaxLength(NUMBER.MAX, {
    message: `The Logger's body must contain at least ${NUMBER.MAX}`,
  })
  body?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsObject()
  @IsOptional()
  user?: Authentication;
}
