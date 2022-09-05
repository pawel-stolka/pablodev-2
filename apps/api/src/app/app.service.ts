import { Injectable } from '@nestjs/common';
import { Message } from '@pablodev2/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to pablodev-2!' };
  }
}
