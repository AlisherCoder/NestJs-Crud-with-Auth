import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Actors } from 'src/actors/schema/actor.schema';

export type MoviesDocument = HydratedDocument<Movies>;

@Schema()
export class Movies {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  year: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actors' }] })
  actors: Actors[];
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
