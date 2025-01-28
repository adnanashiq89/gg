import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsEmail, IsMongoId, IsString, MaxLength } from 'class-validator';
import mongoose, { Document } from 'mongoose';
export type EpisodeDocument = Episode & Document;

@Schema()
export class Episode {
  id?: string;

  @IsMongoId()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
  })
  season_id: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  discription: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
EpisodeSchema.virtual('id').get(function (this: EpisodeDocument) {
  return this._id.toString();
});
