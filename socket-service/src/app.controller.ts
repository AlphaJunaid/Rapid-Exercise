import { Controller } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { Socket, Server } from 'socket.io';

@Controller()
export class AppController {
  constructor(private appGateway: AppGateway) {
    this.appGateway.sendResult('Upload Complete', new Server());
  }
  

}