import { Injectable } from '@nestjs/common';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Series, SeriesDocument } from './schema';
import { Model } from 'mongoose';
import { CreateSeriesDto } from './dto/create-series.dto';


@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name)
    private readonly seriesModel: Model<SeriesDocument>,
  ) {}
  async create(createSeriesDto: CreateSeriesDto) {
    const data = new this.seriesModel(createSeriesDto);
    return await data.save();
  }

  async findAll() {
    const data = await this.seriesModel.find();
    return { message: 'Success', data };
  }

  async findOne(id: string) {
    const data = await this.seriesModel.findById(id);
    return { message: 'Success', data };
  }

  async update(id: string, UpdateSeriesDto: UpdateSeriesDto) {
    const data = await this.seriesModel.findByIdAndUpdate(id, UpdateSeriesDto);
    return { message: 'Succes', data };
  }

  async remove(id: string) {
    const data = await this.seriesModel.findByIdAndDelete(id);
    return { message: 'Success', data };
  }
}
