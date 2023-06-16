/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class OrderInterceptors implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data) => ({
        data: data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message,
      })),
    );
  }
}
