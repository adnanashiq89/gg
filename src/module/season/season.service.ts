import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Season } from './schema';
import mongoose, { Model } from 'mongoose';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(Season.name) private readonly seasonModel: Model<Season>,
  ) {}
  async create(createSeasonDto: CreateSeasonDto) {
    const data = new this.seasonModel(createSeasonDto);
    return await data.save();
  }
  async aggregation(id: string) {
    try {
      const user = await this.seasonModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            let: { series_id: '$series_id' },
            from: 'seasons',
            pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$series_id'] } } }],
            as: 'season',
          },
        },
      ]);
      return { message: 'Success', user };
    } catch (error) {
      return { message: 'error', data: error.message };
    }
  }

  async findAll() {
    const data = await this.seasonModel.find();
    return { message: 'Success', data };
  }

  async findOne(id: string) {
    const data = await this.seasonModel.findById(id);
    return { message: 'Success', data };
  }

  async update(id: string, UpdateSeasonDto: UpdateSeasonDto) {
    const data = await this.seasonModel.findByIdAndUpdate(id, UpdateSeasonDto);
    return { message: 'Succes', data };
  }

  async remove(id: string) {
    const data = await this.seasonModel.findByIdAndDelete(id);
    return { message: 'Success', data };
  }
}
