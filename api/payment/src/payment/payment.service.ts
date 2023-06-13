import { Injectable } from '@nestjs/common';
import { Payment } from './payment.entity/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(payment: Payment): Promise<Payment> {
    return await this.paymentRepo.save(payment);
  }
}
