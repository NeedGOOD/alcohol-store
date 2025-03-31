import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject()
    private readonly userService: UsersService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOne(createOrderDto.user_id);

    const order = this.orderRepository.create({
      ...createOrderDto,
      user,
    });

    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
