import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
// import { UpdateAlcoholDto } from './dto/update-alcohol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alcohol } from './entities/alcohol.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { FilterAlcoholDto } from './dto/filter-alcohol.dto';

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

  async findAlcoholByFilter(filterAlcoholDto: FilterAlcoholDto) {
    const where: FindOptionsWhere<Alcohol> = {};

    // Object.keys(where).forEach(key => where[key] === undefined && delete where[key]);

    Object.entries(filterAlcoholDto).forEach(([key, value]) => {
      if (value === undefined) return;

      // масив → In()
      if (Array.isArray(value)) {
        where[key] = In(value);
      } else {
        where[key] = value;
      }
    });

    // console.log('where', where);

    try {
      return await this.alcoholRepository.find({ where });
    } catch (error) {
      throw new NotFoundException('Alcohol not found.');
    }
  }

  // update(id: number, updateAlcoholDto: UpdateAlcoholDto) {
  //   return `This action updates a #${id} alcohol`;
  // }

  async remove(id: number) {
    await this.findOne(id);
    return await this.alcoholRepository.delete(id);
  }
}
