import { Injectable } from '@nestjs/common';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
import { UpdateAlcoholDto } from './dto/update-alcohol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alcohol } from './entities/alcohol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlcoholService {
  constructor(
    @InjectRepository(Alcohol)
    private readonly alcoholRepository: Repository<Alcohol>
  ) { }

  async create(createAlcoholDto: CreateAlcoholDto) {
    const alcohol = this.alcoholRepository.create(createAlcoholDto);

    return await this.alcoholRepository.save(alcohol);
  }

  async findAll() {
    return await this.alcoholRepository.find({ relations: ['orderItems'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} alcohol`;
  }

  update(id: number, updateAlcoholDto: UpdateAlcoholDto) {
    return `This action updates a #${id} alcohol`;
  }

  remove(id: number) {
    return `This action removes a #${id} alcohol`;
  }
}
