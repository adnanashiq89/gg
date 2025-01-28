import { Stream } from '../schema';

import { PickType } from '@nestjs/mapped-types';

export class CreateStreamDto extends PickType(Stream, [
  'episode_id',
  'user_id',
  'time',
]) {}
