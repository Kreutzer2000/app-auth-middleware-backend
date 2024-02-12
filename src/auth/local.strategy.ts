// src/auth/local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'usuario', // Asegúrate de cambiar esto si tu campo se llama diferente
      passwordField: 'contrasena',
    });
  }

  async validate(usuario: string, contrasena: string): Promise<any> {
    const user = await this.authService.validateUser(usuario, contrasena);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
