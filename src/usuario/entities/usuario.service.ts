// src/usuario/entities/usuario.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto'; // Asegúrate de importar los DTOs
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword, // Asegúrate de que la contraseña sea segura
    });
    return this.usuarioRepository.save(usuario);
  }

  findOne(idOrEmail: string): Promise<Usuario> {
    if (idOrEmail.includes('@')) {
      // Busca por email
      return this.usuarioRepository.findOne({ where: { email: idOrEmail } });
    } else {
      // Busca por id (UUID como string)
      return this.usuarioRepository.findOne({ where: { id: idOrEmail } });
    }
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
