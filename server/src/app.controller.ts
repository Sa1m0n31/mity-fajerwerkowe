import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getArguments')
  async getAllArguments() {
    return this.appService.getAllArguments();
  }

  @Post('/findArgumentsInText')
  async findArgumentsInText(@Body() body) {
    const { text } = body;
    return this.appService.findArgumentsInText(text);
  }

  @Post('/addPlaylist')
  async addPlaylist(@Body() body) {
    const { recipientName, link, argumentsArray, withText } = body;
    return this.appService.addPlaylist(recipientName, link, argumentsArray, withText);
  }

  @Get('/getPlaylistByLink/:link')
  async getPlaylistByLink(@Param('link') link) {
    return this.appService.getPlaylistByLink(link);
  }

  @Post('/generateResponse')
  async generateResponse(@Body() body) {
    const { argumentsIds } = body;
    return this.appService.generateResponse(argumentsIds);
  }

  @Post('/getFullResponse')
  async getFullResponse(@Body() body) {
    const { argumentsIds } = body;
    return this.appService.getFullResponse(argumentsIds);
  }

  @Post('/updatePlaylist')
  async updatePlaylist(@Body() body) {
    const { id, recipientName, link } = body;
    return this.appService.updatePlaylist(id, recipientName, link);
  }

  @Post('/toggleWithText')
  async toggleWithText(@Body() body) {
    const { id, withText } = body;
    return this.appService.toggleWithText(id, withText);
  }
}
