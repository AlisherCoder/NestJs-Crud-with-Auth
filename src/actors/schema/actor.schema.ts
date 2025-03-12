import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movies } from 'src/movies/schema/movie.schema';

export type ActorsDocument = HydratedDocument<Actors>;

@Schema()
export class Actors {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  year: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }] })
  movies: Movies[];
}

export const ActorsSchema = SchemaFactory.createForClass(Actors);
