import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      console.log('No se pudo autenticar el usuario.', err);
      throw err || new UnauthorizedException();
    }
    console.log('Usuario autenticado:', user);
    return user;
  }
}
