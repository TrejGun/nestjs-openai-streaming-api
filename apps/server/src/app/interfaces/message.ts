import { Roles } from './roles';

export interface IMessageDto {
  content: string;
  role: Roles;
}
