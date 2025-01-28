import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsMongoId, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
export type StreamDocument = Stream & Document;

@Schema()
export class Stream {
  id?: string;

  @IsMongoId()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode',
  })
  episode_id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'Student',
  })
  user_id: string;

 

  @IsString()
  @Prop({ required: true })
  time: string;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);
StreamSchema.virtual('id').get(function (this: StreamDocument) {
  return this._id.toString();
});
