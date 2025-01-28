import { Season } from '../schema';
import { PickType } from '@nestjs/mapped-types';

export class UpdateSeasonDto extends PickType(Season, [
  'series_id',
  'name',
  'discription',
]) {}
