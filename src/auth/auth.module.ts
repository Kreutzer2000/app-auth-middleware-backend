// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; // Asegúrate de crear este archivo
import { LocalStrategy } from './local.strategy';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tu_secreto_jwt', // Usa una clave más segura y guárdala en variables de entorno
      signOptions: { expiresIn: '60s' }, // Configura según tus necesidades
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Añade JwtStrategy aquí
  controllers: [AuthController],
})
export class AuthModule {}
