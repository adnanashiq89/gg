import { Season } from '../schema';
import { PickType } from '@nestjs/mapped-types';

export class CreateSeasonDto extends PickType(Season, [
  'series_id',
  'name',
  'discription',
]) {}
