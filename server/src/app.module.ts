import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from "path";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServeStaticModule} from "@nestjs/serve-static";
import {ArgumentsEntity} from "./entities/arguments.entity";
import {PlaylistsEntity} from "./entities/playlists.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql', // type of our database
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, // database host
      username: process.env.DATABASE_USERNAME, // username
      password: process.env.DATABASE_PASSWORD, // user password
      database: process.env.DATABASE_NAME, // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: false, // your entities will be synced with the database (recommended: disable in prod)
    }),
    TypeOrmModule.forFeature([ArgumentsEntity, PlaylistsEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
