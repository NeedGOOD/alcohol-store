import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() request) {
    if (request.user.userId !== +id) {
      throw new UnauthorizedException(`User with ${id} id not valid.`);
    }

    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('update-password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordUserDto: UpdatePasswordUserDto) {
    console.log(id);

    console.log(updatePasswordUserDto);

    return this.usersService.updatePassword(+id, updatePasswordUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
