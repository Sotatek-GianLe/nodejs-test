import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity/order.entity';
import { OrderInterceptors } from 'src/interceptors/order.intersceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
@UseInterceptors(OrderInterceptors)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.orderService.findOneById(params.id);
  }

  @Post()
  create(@Body() order: Order) {
    return this.orderService.create(order);
  }

  @Put()
  update(@Body() order: Order) {
    return this.orderService.update(order);
  }

  @Put('/cancel')
  cancel(@Body() order: Order) {
    return this.orderService.updateStatusById(order);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.orderService.delete(params.id);
  }

  @Post('/payOrder')
  paymentOrder(@Body() orderId: number) {
    return this.orderService.paymentOrder(orderId);
  }
}
