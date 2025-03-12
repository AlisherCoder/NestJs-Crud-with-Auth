import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Actors } from './schema/actor.schema';
import { Model } from 'mongoose';
import { Movies } from 'src/movies/schema/movie.schema';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(Actors.name) private actorsModel: Model<Actors>,
    @InjectModel(Movies.name) private moviesModel: Model<Movies>,
  ) {}

  async create(createActorDto: CreateActorDto) {
    try {
      let data = await this.actorsModel.create(createActorDto);

      await this.moviesModel.findByIdAndUpdate(data.movies, {
        $push: { actors: data._id },
      });

      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      let data = await this.actorsModel.find();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.actorsModel.findById(id);
      if (!data) {
        return { message: 'Not found data.' };
      }
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    try {
      let data = await this.actorsModel.findByIdAndUpdate(id, updateActorDto, {
        new: true,
      });
      if (!data) {
        return { message: 'Not found data.' };
      }
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: string) {
    try {
      let data = await this.actorsModel.findByIdAndDelete(id);
      if (!data) {
        return { message: 'Not found data.' };
      }
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }
}
