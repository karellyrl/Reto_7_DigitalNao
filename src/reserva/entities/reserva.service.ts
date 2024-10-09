// src/reserva/entities/reserva.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';
import { CreateReservaDto, UpdateReservaDto } from './reserva.dto'; 
import { Libro } from '../../libro/entities/libro.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,

    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const libro = await this.libroRepository.findOne({ where: { id: createReservaDto.libroId } });
    const usuario = await this.usuarioRepository.findOne({ where: { id: String(createReservaDto.usuarioId) } });


    if (!libro || !usuario) {
      throw new Error('Libro o usuario no encontrados');
    }

      // Verifica si el libro ya ha sido reservado
    if (!libro.disponible) {
      throw new Error('Este libro ya ha sido reservado');
    }

    const reserva = this.reservaRepository.create({
      ...createReservaDto,
      libro,
      usuario,
    });

    const savedReserva = await this.reservaRepository.save(reserva);

    libro.disponible = false; // Marca el libro como no disponible
    await this.libroRepository.save(libro);

    return savedReserva;
  }

  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find();
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }
    return reserva;
  }

  async findByLibroId(libroId: number): Promise<Reserva[]> {
    return this.reservaRepository.find({ where: { libro: { id: libroId } }, relations: ['libro', 'usuario'] });
  }

  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id); // Busca la reserva a actualizar

    // Actualiza los campos de la reserva
    Object.assign(reserva, updateReservaDto);

    // Guarda la reserva actualizada
    return this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Reserva no encontrada');
    }
  }
}
