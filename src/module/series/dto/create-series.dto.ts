import { Series } from '../schema';
import { PickType } from '@nestjs/mapped-types';

export class CreateSeriesDto extends PickType(Series, [
  'genre_id',
  'name',
  'discription',
  'trailer',
]) {}
