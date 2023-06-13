import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Order } from './order.entity/order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENT_SERVICE } from 'src/constants/services';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @Inject(PAYMENT_SERVICE) private paymentService: ClientProxy,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepo.find();
  }

  async findOneById(id: number): Promise<Order> {
    return await this.orderRepo.findOneById(id);
  }

  async create(order: Order): Promise<Order> {
    const dataOrder = await this.orderRepo.save(order);
    this.paymentService.emit('ORDER_CREATED', dataOrder);
    return dataOrder;
  }

  async update(order: Order): Promise<UpdateResult> {
    return await this.orderRepo.update(order.id, order);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.orderRepo.delete(id);
  }

  async updateStatusById(order: Order): Promise<any> {
    try {
      await this.orderRepo.update(order.id, {
        status: 4,
      });
      return await this.findOneById(order.id);
    } catch (error) {
      return 'Update Failed!';
    }
  }

  async paymentOrder(orderId: number): Promise<any> {
    try {
      const order = await this.findOneById(orderId);
      return order;
    } catch (error) {
      return 'Update Failed!';
    }
  }
}
