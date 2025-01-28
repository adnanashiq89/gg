import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamSchema, Stream } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stream', schema: StreamSchema }]),
  ],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
