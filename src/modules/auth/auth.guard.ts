import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);

    if (user.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user[0];
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateToken(jwtToken: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(jwtToken);
      return Boolean(decoded);
    } catch (error) {
      return false;
    }
  }
}
