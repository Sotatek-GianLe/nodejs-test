import { Injectable } from '@nestjs/common';
import { Payment } from './payment.entity/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { STATUS_CANCEL, STATUS_CONFIRMED } from 'src/constants/status';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(payment: Payment): Promise<Payment> {
    return await this.paymentRepo.save(payment);
  }

  async cancelOrder(req: any): Promise<UpdateResult> {
    return await this.paymentRepo.update(
      {
        order_id: req.id,
      },
      {
        status: STATUS_CANCEL,
      },
    );
  }

  async paymentOrder(req: any): Promise<UpdateResult> {
    return await this.paymentRepo.update(
      {
        order_id: req.id,
      },
      {
        status: STATUS_CONFIRMED,
      },
    );
  }
}
