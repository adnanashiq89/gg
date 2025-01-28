import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeasonSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:"Season" , schema:SeasonSchema}])
  ],
  controllers: [SeasonController],
  providers: [SeasonService]
})
export class SeasonModule {}
