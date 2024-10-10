import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/entities/usuario.service'; 
import { Usuario } from '../usuario/entities/usuario.entity'; 
import * as bcrypt from 'bcrypt'; 

@Injectable() 
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService, // Inyecta el servicio de usuarios
    private readonly jwtService: JwtService, // Inyecta el servicio JWT para firmar tokens
  ) {}

  // Valida las credenciales del usuario (email y password)
  async validateUsuario(email: string, password: string): Promise<Usuario | null> {
    // Busca el usuario por email
    const usuario = await this.usuarioService.findOne(email);
    
    // Si el usuario existe y la contraseña es correcta (comparación con bcrypt)
    if (usuario && await bcrypt.compare(password, usuario.password)) {
      return usuario; // Retorna el usuario si la autenticación es exitosa
    }
    
    return null; // Si las credenciales no son válidas, retorna null
  }

  // Genera y devuelve el token JWT para el usuario autenticado
  async login(usuario: Usuario) {
    const payload = { email: usuario.email, sub: usuario.id }; // Información que irá en el token 
    return {
      access_token: this.jwtService.sign(payload), // Firma y devuelve el token JWT
    };
  }
}
