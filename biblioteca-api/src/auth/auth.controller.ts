import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuario/entities/usuario.dto'; // Asegúrate de importar el DTO correspondiente
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() usuario: CreateUsuarioDto) {
    const validUsuario = await this.authService.validateUsuario(usuario.email, usuario.password);
    if (!validUsuario) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(validUsuario);
  }
}
