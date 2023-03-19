import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignUpDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signUp(signUpDto: SignUpDto, res: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const createdUser = await this.usersService.create(signUpDto, hashedPassword, res);
    return createdUser;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(password, user[0].password)) {
      return user[0];
    }
    return null;
  }
  async findUserByEmail(email : string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if(user.length === 0) {
      return null
    }
    return user[0]
  } 

  async generateAccessToken(user: User): Promise<string> {
    const payload = { email: user.email };
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const token = await jwt.sign(payload, secret, { expiresIn });
    return token;
  }
}
