import { Module } from '@nestjs/common';
import { AlcoholService } from './alcohol.service';
import { AlcoholController } from './alcohol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alcohol } from './entities/alcohol.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alcohol, OrderItem])],
  controllers: [AlcoholController],
  providers: [AlcoholService],
  exports: [AlcoholService],
})
export class AlcoholModule { }
