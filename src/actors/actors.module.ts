import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Actors, ActorsSchema } from './schema/actor.schema';
import { Movies, MoviesSchema } from 'src/movies/schema/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Actors.name, schema: ActorsSchema },
      { name: Movies.name, schema: MoviesSchema },
    ]),
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
