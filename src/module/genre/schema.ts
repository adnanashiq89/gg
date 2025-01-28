import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsEmail, IsMongoId, IsString, MaxLength } from 'class-validator';
import mongoose, { Document } from 'mongoose';
export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  id?: string;

  @IsString()
  @Prop({ required: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
GenreSchema.virtual('id').get(function (this: GenreDocument) {
  return this._id.toString();
});
