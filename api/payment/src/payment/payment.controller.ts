import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  ORDER_CANCEL,
  ORDER_CREATED,
  ORDER_PAYMENT,
} from 'src/constants/events';
import { Payment } from './payment.entity/payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern(ORDER_CREATED)
  async handleOrderCreated(@Payload() data: any) {
    const paymentData = new Payment();
    paymentData.order_id = data.id;
    paymentData.user_id = data.user_id;
    paymentData.status = data.status;
    paymentData.price_total = data.price_total;
    return this.paymentService.create(paymentData);
  }

  @EventPattern(ORDER_CANCEL)
  async handleOrderCancel(@Payload() dataRequest: any) {
    return this.paymentService.cancelOrder(dataRequest);
  }

  @EventPattern(ORDER_PAYMENT)
  async handleOrderPayment(@Payload() dataRequest: any) {
    return this.paymentService.paymentOrder(dataRequest);
  }
}
