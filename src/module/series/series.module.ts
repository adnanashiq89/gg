import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Series', schema: SeriesSchema }]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
