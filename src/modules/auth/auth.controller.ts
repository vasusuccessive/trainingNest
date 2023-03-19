import { Controller, Post, Body, UnauthorizedException, Res,
  UseGuards,
  Req,
  Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/schema/user.schema';
import { SignUpDto, LoginDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto,
  @Res() res: Response): Promise<User> {
    const createdUser = await this.authService.signUp(signUpDto, res);
    return createdUser;
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.authService.generateAccessToken(user);
    return  {accessToken :`Bearer ${accessToken}`} ;
  }
}
