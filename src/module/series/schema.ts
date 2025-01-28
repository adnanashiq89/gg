import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsMongoId, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
export type SeriesDocument = Series & Document;

@Schema()
export class Series {
  id?: string;

  @IsMongoId()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
  })
  genre_id: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  discription: string;

  @IsString()
  @Prop({ required: true })
  trailer: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
SeriesSchema.virtual('id').get(function (this: SeriesDocument) {
  return this._id.toString();
});
