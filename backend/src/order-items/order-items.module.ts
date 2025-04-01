import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { AlcoholModule } from 'src/alcohol/alcohol.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    OrdersModule,
    AlcoholModule,
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule { }
