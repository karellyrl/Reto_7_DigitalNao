import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/entities/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import * as bcrypt from 'bcrypt'; // Importa bcrypt

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUsuario(email: string, password: string): Promise<Usuario | null> {
    const usuario = await this.usuarioService.findOne(email);
    if (usuario && await bcrypt.compare(password, usuario.password)) { // Compara contraseñas
      return usuario;
    }
    return null;
  }

  async login(usuario: Usuario) {
    const payload = { email: usuario.email, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
