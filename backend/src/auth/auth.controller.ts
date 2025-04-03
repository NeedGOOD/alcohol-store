import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from 'src/type/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  create(@Body() input: AuthInput) {
    return this.authService.authenticate(input);
  }
}
