import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { HashService } from './hash.services';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private hashService: HashService,
  ) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  async aggregation(id: string) {
    try {
      const user = await this.userModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            let: { user: '$_id' },
            from: 'streams',
            pipeline: [
              { $match: { $expr: { $eq: ['$user_id', '$$user'] } } },
              {
                $lookup: {
                  let: { stream: '$episode_id' },
                  from: 'episodes',
                  pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$stream'] } } },
                    {
                      $lookup: {
                        let: { episode: '$season_id' },
                        from: 'seasons',
                        pipeline: [
                          { $match: { $expr: { $eq: ['$_id', '$$episode'] } } },
                          {
                            $lookup: {
                              let: { season: '$series_id' },
                              from: 'series',
                              pipeline: [
                                {
                                  $match: {
                                    $expr: { $eq: ['$_id', '$$season'] },
                                  },
                                },
                                {
                                  $lookup: {
                                    let: { series: '$genre_id' },
                                    from: 'genres',
                                    pipeline: [
                                      {
                                        $match: {
                                          $expr: { $eq: ['$_id', '$$series'] },
                                        },
                                      },
                                    ],
                                    as: 'genre',
                                  },
                                },
                              ],
                              as: 'series',
                            },
                          },
                        ],
                        as: 'seasons',
                      },
                    },
                  ],
                  as: 'episodes',
                },
              },
            ],
            as: 'streams',
          },
        },
      ]);
      return { message: 'Success', user };
    } catch (error) {
      return { message: 'error', data: error.message };
    }
  }

  async GetAll() {
    const data = await this.userModel.find();
    return { message: 'Success', data };
  }

  async findOne(id: string) {
    const data = await this.userModel.findById(id);
    console.log(data);
    return { message: 'Success', data };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    updateUserDto.password = await this.hashService.hashPassword(
      updateUserDto.password,
    );

    data.password = updateUserDto.password;
    await data.save();
    console.log(data);
    return { message: 'Success', data };
  }

  async remove(id: string) {
    const data = await this.userModel.findByIdAndDelete(id);
    return { message: 'Success', data };
  }

  getUserByUsername(email: string) {
    return this.userModel.findOne({ email });
  }
}
