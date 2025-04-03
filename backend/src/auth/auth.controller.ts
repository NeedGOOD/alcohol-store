import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from 'src/type/auth.type';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  create(@Body() input: AuthInput) {
    return this.authService.authenticate(input);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }
}
