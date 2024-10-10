import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from '../usuario/entities/usuario.entity'; 
import { CreateUsuarioDto } from '../usuario/entities/usuario.dto'; 
import { ApiTags } from '@nestjs/swagger'; 

@ApiTags('Login') // Etiqueta la categoría de "Login" en la documentación de Swagger
@Controller('auth') // Define que este controlador maneja rutas bajo '/auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inyecta el servicio de autenticación

  // Maneja la solicitud POST para la ruta '/auth/login'
  @Post('login')
  async login(@Body() usuario: CreateUsuarioDto) {
    // Llama al servicio de autenticación para validar las credenciales del usuario
    const validUsuario = await this.authService.validateUsuario(usuario.email, usuario.password);
    
    // Si las credenciales no son válidas, devuelve un mensaje de error
    if (!validUsuario) {
      return { message: 'Invalid credentials' }; // Puedes lanzar una excepción en lugar de devolver un objeto
    }
    
    // Si las credenciales son válidas, llama al servicio para generar y devolver el token JWT
    return this.authService.login(validUsuario);
  }
}
