import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    const data = new this.genreModel(createGenreDto);
    return await data.save();
  }
  async aggregation(id: string) {
    try {
      const user = await this.genreModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            // from: 'series',
            // localField: '_id',
            // foreignField: 'genre_id',
            // as: 'series',
            let: { series: '$_id' },
            from: 'series',
            pipeline: [
              { $match: { $expr: { $eq: ['$genre_id', '$$series'] } } },
              {
                $lookup: {
                  let: { season: '$_id' },
                  from: 'seasons',
                  pipeline: [
                    { $match: { $expr: { $eq: ['$series_id', '$$season'] } } },
                    {
                      $lookup: {
                        let: { episode: '$_id' },
                        from: 'episodes',
                        pipeline: [
                          {
                            $match: {
                              $expr: { $eq: ['$season_id', '$$episode'] },
                            },
                          },
                          {
                            $lookup: {
                              let: { stream: '$_id' },
                              from: 'streams',
                              pipeline: [
                                {
                                  $match: {
                                    $expr: { $eq: ['$episode_id', '$$stream'] },
                                  },
                                },
                                {
                                  $lookup: {
                                    let: { user: '$user_id' },
                                    from: 'users',
                                    pipeline: [
                                      {
                                        $match: {
                                          $expr: {
                                            $eq: ['$_id', '$$user'],
                                          },
                                        },
                                      },
                                    ],
                                    as: 'user',
                                  },
                                },
                              ],
                              as: 'stream',
                            },
                          },
                        ],
                        as: 'episode',
                      },
                    },
                  ],
                  as: 'seasons',
                },
              },
            ],

            as: 'series',
          },
        },
      ]);
      return { message: 'Success', user };
    } catch (error) {
      return { message: 'error', data: error.message };
    }
  }

  async findAll() {
    const data = await this.genreModel.find();
    return { message: 'Success', data };
  }

  async findOne(id: string) {
    const data = await this.genreModel.findById(id);
    return { message: 'Success', data };
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const data = await this.genreModel.findByIdAndUpdate(id, updateGenreDto);
    return { message: 'Succes', data };
  }

  async remove(id: string) {
    const data = await this.genreModel.findByIdAndDelete(id);
    return { message: 'Success', data };
  }
}
