import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Order } from './order.entity/order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENT_SERVICE } from 'src/constants/services';
import { ROLE_CLIENT } from 'src/constants/roles';
import {
  STATUS_CANCEL,
  STATUS_CONFIRMED,
  STATUS_INIT,
} from 'src/constants/status';
import { EventService } from 'src/events/event.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @Inject(PAYMENT_SERVICE) private paymentService: ClientProxy,
    private eventService: EventService,
  ) {}

  async findAll(user: any): Promise<Order[]> {
    if (user?.role === ROLE_CLIENT) {
      return await this.orderRepo.findBy({ user_id: user.sub });
    }
    return await this.orderRepo.find();
  }

  async findOneById(id: number): Promise<Order> {
    return await this.orderRepo.findOneById(id);
  }

  async create(order: Order, user: any): Promise<Order> {
    order.user_id = user.sub;
    order.status = STATUS_INIT;
    const dataOrder = await this.orderRepo.save(order);
    this.paymentService.emit('ORDER_CREATED', dataOrder);
    this.eventService.updateStatus(dataOrder);
    return dataOrder;
  }

  async update(order: Order): Promise<UpdateResult> {
    return await this.orderRepo.update(order.id, order);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.orderRepo.delete(id);
  }

  async cancelOrder(order: Order): Promise<any> {
    try {
      await this.orderRepo.update(order.id, {
        status: STATUS_CANCEL,
      });
      const orderCancel = await this.findOneById(order.id);
      this.paymentService.emit('ORDER_CANCEL', orderCancel);
      this.eventService.updateStatus(orderCancel);
      return orderCancel;
    } catch (error) {
      return 'Update Failed!';
    }
  }

  async paymentOrder(orderId: number): Promise<any> {
    try {
      await this.orderRepo.update(orderId, {
        status: STATUS_CONFIRMED,
      });
      const orderPayment = await this.findOneById(orderId);
      this.paymentService.emit('ORDER_PAYMENT', orderPayment);
      this.eventService.updateStatus(orderPayment);
      return orderPayment;
    } catch (error) {
      return 'Payment Failed!';
    }
  }
}
