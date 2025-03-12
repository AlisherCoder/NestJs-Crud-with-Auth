import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MoviesModule,
    ActorsModule,
    UploadModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
