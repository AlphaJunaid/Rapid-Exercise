import { Injectable } from '@angular/core';
import * as io from 'ngx-socket-io';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: io.Socket) {}

  connect(){
    this.socket.connect();
  }

  listen() {
    this.socket.on('notifFrom', (message: any) => {
      console.log(123);
    })
  }

  emit() {
    this.socket.emit('notifTo', 'xyz');
  }
}
