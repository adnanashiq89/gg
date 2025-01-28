import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsEmail, IsMongoId, IsString, MaxLength } from 'class-validator';
import mongoose, { Document } from 'mongoose';
export type SeasonDocument = Season & Document;

@Schema()
export class Season {
  id?: string;

  @IsMongoId()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  })
  series_id: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  discription: string;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
SeasonSchema.virtual('id').get(function (this: SeasonDocument) {
  return this._id.toString();
});
