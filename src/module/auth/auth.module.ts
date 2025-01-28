import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { HashService } from '../users/hash.services';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from '../strategy/constant';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "1day" },
  }),],
  controllers: [AuthController],
  providers: [AuthService ,UsersService , HashService],
  exports : [AuthService]
})
export class AuthModule {}
