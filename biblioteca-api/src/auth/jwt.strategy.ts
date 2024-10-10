import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

@Injectable() // Permite que esta clase sea inyectada en otros componentes
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Configuración de la estrategia JWT
    super({
      // Extraer el token JWT desde el header de autorización en formato Bearer
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // No permitir tokens expirados
      secretOrKey: process.env.JWT_SECRET, // Llave secreta obtenida de las variables de entorno
    });
  }

  // Método para validar el token JWT
  // `payload` contiene los datos decodificados del token
  async validate(payload: any) {
    // Retornar la información del usuario extraída del payload del token
    return { userId: payload.sub, email: payload.email };
  }
}
