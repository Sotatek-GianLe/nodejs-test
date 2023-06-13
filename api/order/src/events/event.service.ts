/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventService extends EventEmitter2 {
  onMyEvent(event: string, callback: (data: any) => void): void {
    this.on(event, callback);
  }

  emitMyEvent(event: string, data: any): void {
    this.emit(event, data);
  }
}
