import { Genre } from '../schema';
import { PickType } from '@nestjs/mapped-types';

export class UpdateGenreDto extends PickType(Genre, ['name']) { }
