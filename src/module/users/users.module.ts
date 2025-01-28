import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { HashService } from './hash.services';

@Module({
  // imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  // exports: [UsersService],
})
export class UsersModule {}
