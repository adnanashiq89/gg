import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsEmail, IsMongoId, IsString, MaxLength } from 'class-validator';
import mongoose, { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  id?: string;
 

  @IsString()
  @Prop({ required: true })
  first_name: string;

  @IsString()
  @Prop({ required: true })
  last_name: string;

  @IsEmail()
  @Prop({ required: true })
  email: string;

  @IsString()
  @MaxLength(10)
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('id').get(function (this: UserDocument) {
  return this._id.toString();
});
