import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { AlcoholService } from 'src/alcohol/alcohol.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemService: Repository<OrderItem>,
    @Inject()
    private readonly alcoholService: AlcoholService,
    @Inject()
    private readonly orderService: OrdersService
  ) { }

  async create(createOrderItemDto: CreateOrderItemDto) {
    const alcohol = await this.alcoholService.findOne(createOrderItemDto.alcohol_id);

    const order = await this.orderService.findOne(createOrderItemDto.order_id);

    const orderItem = this.orderItemService.create({
      ...createOrderItemDto,
      alcohol,
      order,
    });

    return await this.orderItemService.save(orderItem);
  }

  async findAll() {
    return await this.orderItemService.find({ relations: ['alcohol', 'order'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
