import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { type IMessageDto, Roles } from '../interfaces';

export class MessageDto implements IMessageDto {
  @ApiProperty()
  @IsString()
  public content: string;

  @ApiProperty()
  @IsEnum(Roles)
  public role: Roles;
}
