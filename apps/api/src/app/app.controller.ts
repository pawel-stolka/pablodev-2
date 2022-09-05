import { Controller, Get } from '@nestjs/common';

import { Message } from '@pablodev2/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Message {
    return this.appService.getData();
  }
}
