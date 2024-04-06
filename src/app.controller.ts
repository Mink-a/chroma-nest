import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AddData } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/heartbeat')
  heartbeat() {
    return this.appService.heartbeatFn();
  }

  @Post('/add')
  add(@Body() data: AddData) {
    return this.appService.add(data);
  }

  @Get('/search')
  search(@Query('query') query?: string) {
    return this.appService.search(query);
  }
}
