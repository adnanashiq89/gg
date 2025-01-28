import { User } from '../user.schema';
import { PickType ,PartialType } from '@nestjs/mapped-types';

export class CreateUserDto extends PickType(User, [
  'first_name',
  'last_name',
  'email',
  'password',
]) {}
export class UserDto extends PartialType(User) {}
