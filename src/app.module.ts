import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { StreamModule } from './module/stream/stream.module';
import { EpisodeModule } from './module/episode/episode.module';
import { GenreModule } from './module/genre/genre.module';
import { SeriesModule } from './module/series/series.module';
import { SeasonModule } from './module/season/season.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/IP-TV'),
    UsersModule,
    AuthModule,
    StreamModule,
    EpisodeModule,
    GenreModule,
    SeriesModule,
    SeasonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
