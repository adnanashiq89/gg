import { User } from '../user.schema';
import { PickType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PickType(User, [
  'first_name',
  'last_name',
  'email',
  'password',

]) { }
