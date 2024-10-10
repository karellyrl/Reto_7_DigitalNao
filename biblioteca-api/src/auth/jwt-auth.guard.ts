import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() // Indica que esta clase puede ser inyectada como dependencia en otros componentes
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Este método maneja la lógica de la autenticación JWT
  handleRequest(err: any, user: any) {
    // Si ocurre un error o no se encuentra el usuario autenticado
    if (err || !user) {
      // Imprime un mensaje de error en la consola
      console.log('No se pudo autenticar el usuario.', err);
      // Lanza una excepción de no autorizado
      throw err || new UnauthorizedException();
    }
    // Si el usuario está autenticado correctamente, imprime el usuario en la consola
    console.log('Usuario autenticado:', user);
    // Retorna el usuario autenticado para que continúe el flujo
    return user;
  }
}
