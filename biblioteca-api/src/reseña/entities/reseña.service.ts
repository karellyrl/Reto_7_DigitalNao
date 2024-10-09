import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './reseña.entity';
import { CreateResenaDto, UpdateResenaDto } from './reseña.dto';
import { Usuario } from '../../usuario/entities/usuario.entity'; 

@Injectable()
export class ReseñaService {
  constructor(
    @InjectRepository(Resena)
    private reseñaRepository: Repository<Resena>,
    
    @InjectRepository(Usuario) // Inyectar el repositorio de Usuario
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createReseñaDto: CreateResenaDto): Promise<Resena> {
    const { usuarioId, libroId, comentario, calificacion, fecha } = createReseñaDto;

    // Buscar el usuario por su ID
    const usuario = await this.usuarioRepository.findOne({ where: { id: String(usuarioId) } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Crear la reseña asociando el usuario
    const reseña = this.reseñaRepository.create({
      libro: { id: libroId }, // Solo necesitas asignar el libroId
      usuario: usuario, // Aquí asociamos el usuario
      comentario,
      calificacion,
      fecha,
    });

    return this.reseñaRepository.save(reseña);
  }

  async findAll(): Promise<Resena[]> {
    return this.reseñaRepository.find();
  }

  async findByLibro(libroId: number): Promise<Resena[]> {
    return this.reseñaRepository.find({
      where: { libro: { id: libroId } },
    });
  }

  async findOne(id: number): Promise<Resena> {
    const reseña = await this.reseñaRepository.findOne({ where: { id } });
    if (!reseña) {
      throw new NotFoundException(`Reseña con ID ${id} no encontrada`);
    }
    return reseña;
  }

  async remove(id: number): Promise<void> {
    const result = await this.reseñaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reseña con ID ${id} no encontrada`);
    }
  }

  // Nuevo método para actualizar una reseña
  async update(id: number, updateReseñaDto: UpdateResenaDto): Promise<Resena> {
    const reseña = await this.findOne(id); // Verifica si la reseña existe
    const updatedReseña = { ...reseña, ...updateReseñaDto }; // Actualiza los campos
    return this.reseñaRepository.save(updatedReseña); // Guarda la reseña actualizada
  }
}
