import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User with email already.');
    }

    const hashedPassword = await this.hashingPassword(createUserDto.password);

    const createUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(createUser);

    const token = await this.authService.register({
      userId: savedUser.id,
      email: savedUser.email,
    });

    console.log(token);

    return {
      ...savedUser,
      accessToken: token,
    };
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['orders'] });
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
        relations: { orders: true },
      });
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

  async updatePassword(id: number, updatePasswordUserDto: UpdatePasswordUserDto) {
    const user = await this.findOne(id);

    const password: UpdatePasswordUserDto = updatePasswordUserDto;

    await this.verificationPassword(password.oldPassword, user.password);

    if (password.newPassword !== password.confirmPassword) {
      throw new BadRequestException('Password do not match.');
    }

    try {
      const hashingPassword = await this.hashingPassword(password.newPassword);

      await this.userRepository.update(id, { password: hashingPassword });

      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Added extra fields.');
    }
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  private async hashingPassword(password: string) {
    const salt = 10;

    return await bcrypt.hash(password, salt);
  }

  async verificationPassword(password: string, hashedPassword: string) {
    const checkingPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkingPassword) {
      throw new UnauthorizedException('Incorrect password.');
    }
  }
}
