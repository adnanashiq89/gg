import { Genre } from '../schema';
import { PickType } from '@nestjs/mapped-types';

export class CreateGenreDto extends PickType(Genre, ['name']) {}
