import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movies } from './schema/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movies.name) private moviesModel: Model<Movies>) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      let data = await this.moviesModel.create(createMovieDto);
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      let data = await this.moviesModel.find().populate('actors');
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.moviesModel.findById(id).populate('actors');
      if (!data) {
        return { message: 'Not found data.' };
      }
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      let data = await this.moviesModel.findByIdAndUpdate(id, updateMovieDto, {
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
      let data = await this.moviesModel.findByIdAndDelete(id);
      if (!data) {
        return { message: 'Not found data.' };
      }
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }
}
