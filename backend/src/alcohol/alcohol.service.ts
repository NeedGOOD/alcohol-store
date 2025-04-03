import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
// import { UpdateAlcoholDto } from './dto/update-alcohol.dto';
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

  async findOne(id: number) {
    try {
      return await this.alcoholRepository.findOneOrFail({
        where: { id },
        relations: { orderItems: true }
      });
    } catch (error) {
      throw new NotFoundException(`Alcohol not found by id ${id}.`);
    }
  }

  // update(id: number, updateAlcoholDto: UpdateAlcoholDto) {
  //   return `This action updates a #${id} alcohol`;
  // }

  remove(id: number) {
    return `This action removes a #${id} alcohol`;
  }
}
