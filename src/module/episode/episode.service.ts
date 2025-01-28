import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Episode } from './schema';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode.name) private readonly episodeModel: Model<Episode>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto) {
    const data = new this.episodeModel(createEpisodeDto);
    return await data.save();
  }
  async aggregation(id: string) {
    try {
      const user = await this.episodeModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            let: { series_id: '$season_id' },
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
    const data = await this.episodeModel.find();
    return { message: 'Success', data };
  }

  async findOne(id: string) {
    const data = await this.episodeModel.findById(id);
    return { message: 'Success', data };
  }

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    const data = await this.episodeModel.findByIdAndUpdate(
      id,
      updateEpisodeDto,
    );
    return { message: 'Succes', data };
  }

  async remove(id: string) {
    const data = await this.episodeModel.findByIdAndDelete(id);
    return { message: 'Success', data };
  }
}
