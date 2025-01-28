import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { HashService } from '../users/hash.services';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private userService: UsersService,
    private hashService: HashService,
    protected jwtService: JwtService,
  ) { }

  async userRegister(createUserDto: CreateUserDto): Promise<any> {

    const user = new this.userModel(createUserDto);
    const usercreate = await this.userService.getUserByUsername(user.email);

    if (usercreate) {
      throw new HttpException('User Already Exist ', HttpStatus.UNAUTHORIZED);
    }
    user.password = await this.hashService.hashPassword(user.password);
    await user.save();
    return { message: 'scucces', user };
  }


  async userLogin(email: string, pass: string): Promise<any> {

    const user = await this.userService.getUserByUsername(email);
    if (user == null) {
      throw new HttpException('Email is Wrong', HttpStatus.UNAUTHORIZED);
    }
    const compare = await this.hashService.comparePassword(pass, user.password);
    if (compare !== true) {
      throw new HttpException('password is Wrong', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, username: user.email };

    return {
      message: 'Success',

      acces_token: await this.jwtService.signAsync(payload),
    };
  }
}
