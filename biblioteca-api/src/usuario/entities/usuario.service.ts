// src/usuario/entities/usuario.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto'; 
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) // Inyecta el repositorio de Usuario para interactuar con la base de datos
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Método para obtener todos los usuarios
  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find(); // Retorna todos los registros de usuarios
  }

  // Método para crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Hashea la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto, // Crea un nuevo objeto de usuario con los datos del DTO
      password: hashedPassword, 
    });
    return this.usuarioRepository.save(usuario); // Guarda el usuario en la base de datos
  }

  // Método para encontrar un usuario por id o email
  findOne(idOrEmail: string): Promise<Usuario> {
    if (idOrEmail.includes('@')) {
      // Busca por email
      return this.usuarioRepository.findOne({ where: { email: idOrEmail } });
    } else {
      // Busca por id (UUID como string)
      return this.usuarioRepository.findOne({ where: { id: idOrEmail } });
    }
  }

  // Método para actualizar un usuario existente
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUsuarioDto); // Actualiza los datos del usuario
    return this.findOne(id); // Retorna el usuario actualizado
  }

  // Método para eliminar un usuario por id
  async remove(id: string): Promise<void> {
    await this.usuarioRepository.delete(id); // Elimina el usuario de la base de datos
  }
}
