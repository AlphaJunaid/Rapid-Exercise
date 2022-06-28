import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  @WebSocketServer()
  server;

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected:    ${client.id}`);
  }
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  sendResult(text: string, server: Server){
    console.log('done1');
    server.emit('notifFrom', text);
  }

  @SubscribeMessage('notifFrom')
  callme(client: Socket, text: string){
    console.log('done');
    client.emit(text);
  }

  // @SubscribeMessage('notifTo')
  // handleMessage(client: Socket, text: string): WsResponse<string> {
  //   // client.emit('msgToClient', text);
  //   this.logger.log(text);
  //   return { event: 'notifFrom', data: text };
  // }
}
