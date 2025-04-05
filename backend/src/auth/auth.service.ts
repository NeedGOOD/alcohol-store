import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInput, AuthResult, RegisInput, SignIn } from 'src/type/auth.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(input: RegisInput): Promise<string> {
    const result = this.signIn(input);

    return (await result).accessToken;
  }

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  private async validateUser(input: AuthInput): Promise<SignIn | null> {
    const user = await this.userService.findUserByEmail(input.email);

    if (user) {
      await this.userService.verificationPassword(input.password, user.password);

      return {
        userId: user.id,
        email: user.email
      };
    }

    return null;
  }

  private async signIn(user: SignIn): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, email: user.email, userId: user.userId };
  }
}
