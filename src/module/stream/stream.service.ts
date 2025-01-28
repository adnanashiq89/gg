import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stream } from './schema';
import { CreateTracingOptions } from 'trace_events';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';

@Injectable()
export class StreamService {
  constructor(
    @InjectModel(Stream.name) private readonly streamModel: Model<Stream>,
  ) {}
  async create(createStreamDto: CreateStreamDto) {
    const data = new this.streamModel(createStreamDto);
    return await data.save();
  }

  async findAll() {
    const data = await this.streamModel.find();
    return { message: 'Success', data };
  }

  async findOne(id: string) {
    const data = await this.streamModel.findById(id);
    return { message: 'Success', data };
  }

  async update(id: string, UpdateStreamDto: UpdateStreamDto) {
    const data = await this.streamModel.findByIdAndUpdate(id, UpdateStreamDto);
    return { message: 'Succes', data };
  }

  async remove(id: string) {
    const data = await this.streamModel.findByIdAndDelete(id);
    return { message: 'Success', data };
  }
}
