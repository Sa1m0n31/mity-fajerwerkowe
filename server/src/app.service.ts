import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ArgumentsEntity} from "./entities/arguments.entity";
import {Repository} from "typeorm";
import {PlaylistsEntity} from "./entities/playlists.entity";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(ArgumentsEntity)
      private readonly argumentsRepository: Repository<ArgumentsEntity>,
      @InjectRepository(PlaylistsEntity)
      private readonly playlistsEntity: Repository<PlaylistsEntity>
  ) {
  }

  getHello(): string {
    return 'Hello World!';
  }
}
