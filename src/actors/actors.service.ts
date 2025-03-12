import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Actors } from './schema/actor.schema';
import { Model } from 'mongoose';

@Injectable()
export class ActorsService {
  constructor(@InjectModel(Actors.name) private actorsModel: Model<Actors>) {}

  async create(createActorDto: CreateActorDto) {
    try {
      let data = await this.actorsModel.create(createActorDto);
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    return `This action returns all actors`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} actor`;
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  async remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
