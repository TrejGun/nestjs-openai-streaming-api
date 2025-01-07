import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum Roles {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
  data = 'data',
}

export class MessageDto {
  @ApiProperty()
  @IsString()
  public content: string;

  @ApiProperty()
  @IsEnum(Roles)
  public role: Roles;
}

export class ChatDto {
  @ApiProperty({
    type: MessageDto,
  })
  @ValidateNested()
  @Type(() => MessageDto)
  public messages: Array<InstanceType<typeof MessageDto>>;
}
