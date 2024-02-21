import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ArgumentsEntity} from "./entities/arguments.entity";
import {In, Repository} from "typeorm";
import {PlaylistsEntity} from "./entities/playlists.entity";
import OpenAI from "openai";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(ArgumentsEntity)
      private readonly argumentsRepository: Repository<ArgumentsEntity>,
      @InjectRepository(PlaylistsEntity)
      private readonly playlistsRepository: Repository<PlaylistsEntity>
  ) {
  }

  async getAllArguments() {
      const allArguments = await this.argumentsRepository.find();
      return allArguments.map((item) => {
          return {
              ...item,
              counterargument_variants: JSON.parse(item.counterargument_variants)
          }
      });
  }

  async getArgumentsNames() {
      const allArguments = await this.argumentsRepository.find();
      return allArguments.map((item) => (item.name));
  }

  async findArgumentsInText(text: string) {
      try {
          const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY
          });

          const antiFireworksArguments = await this.getArgumentsNames();

          const completion = await openai.chat.completions.create({
              messages: [{"role": "user", "content": `Oto lista argumentów antyfajerwerkowych: 
              ${JSON.stringify(antiFireworksArguments)}. Oto komentarz antyfajerwerkowca: ${text}. Wskaż proszę,
               które z argumentów podanych w tablicy zostały wymienione w podanym komentarzu. 
               Odpowiedź podaj tylko jako tablicę [] z wymienionymi indeksami argumentów, które zostały poruszone. 
               Indeksy numeruj od 0.`}],
              model: "gpt-4",
          });

          return completion.choices[0].message.content;
      }
      catch(e) {
          console.log(e);
          return [];
      }
  }

  async addPlaylist(recipientName, link, argumentsArray, withText) {
      return this.playlistsRepository.save({
          recipient_name: recipientName,
          primary_unique_link: link,
          generated_unique_link: link,
          arguments_array: JSON.stringify(argumentsArray),
          with_text: withText
      });
  }

  async updatePlaylist(id, recipientName, link) {
      return this.playlistsRepository
          .createQueryBuilder()
          .update({
              recipient_name: recipientName,
              primary_unique_link: link,
              generated_unique_link: link
          })
          .where({
              id
          })
          .execute();
  }

  async toggleWithText(id, withText) {
      return this.playlistsRepository
          .createQueryBuilder()
          .update({
              with_text: withText
          })
          .where({
              id
          })
          .execute();
  }

  async getPlaylistByLink(link) {
      return this.playlistsRepository.findOneBy({
          generated_unique_link: link
      });
  }

  getRandomVariant(variants) {
      return variants[Math.floor(Math.random() * variants.length)];
  }

  async generateFullResponseFromArgumentsList(argumentsList) {
      return argumentsList.map((item, index, array) => {
          const variant = this.getRandomVariant(JSON.parse(item.counterargument_variants));

          if(array.length === 1) {
              const { full } = variant;
              return full;
          }
          else if(index === 0) {
              const { full, conjunction_after } = variant;
              return `${full} ${conjunction_after}`
          }
          else if(index === array.length - 1) {
              const { full, conjunction_before } = variant;
              return `${conjunction_before} ${full}`;
          }
          else {
              const { full, conjunction_before, conjunction_after } = variant;
              return `${conjunction_before} ${full} ${conjunction_after}`;
          }
      }).join('. ');
  }

  async getFullResponse(argumentsIds) {
      const argumentsList = await this.argumentsRepository.findBy({
          id: In(argumentsIds)
      });

      return this.generateFullResponseFromArgumentsList(argumentsList);
  }

  async generateResponse(argumentsIds) {
      const argumentsList = await this.argumentsRepository.findBy({
          id: In(argumentsIds)
      });

      const insertedRow = await this.addPlaylist('', '', argumentsList.map((item) => (item.id)), true);
      const id = insertedRow.id;

      const fullResponse = this.generateFullResponseFromArgumentsList(argumentsList);

      const shortResponse = argumentsList.map((item, index, array) => {
          const variant = this.getRandomVariant(JSON.parse(item.counterargument_variants));

          if(array.length === 1) {
              const { extract } = variant;
              return extract;
          }
          else if(index === 0) {
              const { extract, conjunction_after } = variant;
              return `${extract} ${conjunction_after}`
          }
          else if(index === array.length - 1) {
              const { extract, conjunction_before } = variant;
              return `${conjunction_before} ${extract}`;
          }
          else {
              const { extract, conjunction_before, conjunction_after } = variant;
              return `${conjunction_before} ${extract} ${conjunction_after}`;
          }
      }).join('. ');

      return {
          fullResponse,
          shortResponse,
          id
      }
  }
}
