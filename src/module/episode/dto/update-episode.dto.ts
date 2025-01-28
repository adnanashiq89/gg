import { PickType } from '@nestjs/mapped-types';
import { CreateEpisodeDto } from './create-episode.dto';
import { User } from 'src/module/users/user.schema';
import { Episode } from '../schema';

export class UpdateEpisodeDto extends PickType(Episode, [
  'season_id',
  'name',
  'discription',
]) {}
