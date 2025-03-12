import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MoviesModule,
    ActorsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
