import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EpisodeSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Episode', schema: EpisodeSchema }]),
  ],

  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
