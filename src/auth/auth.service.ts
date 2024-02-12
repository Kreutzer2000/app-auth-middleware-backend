// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.contrasena, 10);
    const newUser = new this.userModel({
      ...userDto,
      contrasena: hashedPassword,
    });
    return newUser.save();
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ usuario: username });
    if (user && (await bcrypt.compare(pass, user.contrasena))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { contrasena, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.usuario, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
