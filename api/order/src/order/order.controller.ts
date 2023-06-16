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
import { GetUser } from 'src/decorator/auth.decorator';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(OrderInterceptors)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@GetUser() user): Promise<Order[]> {
    return this.orderService.findAll(user);
  }

  @Get(':id')
  get(@Param() params) {
    return this.orderService.findOneById(params.id);
  }

  @Post()
  create(@Body() order: Order, @GetUser() user) {
    return this.orderService.create(order, user);
  }

  @Put()
  update(@Body() order: Order) {
    return this.orderService.update(order);
  }

  @Put('/cancel')
  cancel(@Body() order: Order) {
    return this.orderService.cancelOrder(order);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.orderService.delete(params.id);
  }

  @Post('/payOrder')
  paymentOrder(@Body() id: number) {
    return this.orderService.paymentOrder(id);
  }
}
