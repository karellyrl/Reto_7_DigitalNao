import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module'; 
import { AuthService } from './auth.service'; 
import { AuthController } from './auth.controller'; 
import { JwtStrategy } from './jwt.strategy'; 
import { JwtAuthGuard } from './jwt-auth.guard'; 
import * as dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

@Module({
  imports: [
    UsuarioModule, // Módulo de usuarios, usado para acceder a los servicios de usuario
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Clave secreta usada para firmar y verificar JWT, obtenida de las variables de entorno
      signOptions: { expiresIn: '1h' }, // El token JWT expira en 1 hora
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // Proveedores disponibles dentro del módulo: servicio de autenticación, estrategia JWT y guard JWT
  controllers: [AuthController], // Controlador de autenticación para manejar las rutas
  exports: [JwtAuthGuard], // Exporta el guard JWT para que pueda ser usado en otros módulos
})
export class AuthModule {}
