import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User with email already.');
    }

    const createUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(createUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('User not found by id.');
    }
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      throw new BadRequestException('An extra password field has been added.');
    }

    await this.findOne(id);

    try {
      await this.userRepository.update(id, updateUserDto);

      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Added extra fields.');
    }
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
