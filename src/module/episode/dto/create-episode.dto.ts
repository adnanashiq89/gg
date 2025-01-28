import { Episode } from '../schema';
import { PickType } from '@nestjs/mapped-types';

export class CreateEpisodeDto extends PickType(Episode, [
  'season_id',
  'name',
  'discription',
]) {}
