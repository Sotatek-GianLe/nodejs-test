/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ORDER_UPDATE_STATUS } from 'src/constants/events';
import { Order } from 'src/order/order.entity/order.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventService {
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    client.emit('connection', 'Success connect to server');
  }
  updateStatus(payload: Order) {
    this.server.emit(ORDER_UPDATE_STATUS, payload);
  }
}
