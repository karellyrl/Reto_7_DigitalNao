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
    private reservaRepository: Repository<Reserva>, // Repositorio para manejar la entidad Reserva

    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>, // Repositorio para manejar la entidad Libro

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>, // Repositorio para manejar la entidad Usuario
  ) {}

  // Método para crear una nueva reserva
  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Busca el libro por su ID en el repositorio
    const libro = await this.libroRepository.findOne({ where: { id: createReservaDto.libroId } });
    // Busca el usuario por su ID en el repositorio
    const usuario = await this.usuarioRepository.findOne({ where: { id: String(createReservaDto.usuarioId) } });

    // Verifica que tanto el libro como el usuario existan
    if (!libro || !usuario) {
      throw new Error('Libro o usuario no encontrados'); // Lanza un error si no se encuentra el libro o el usuario
    }

    // Verifica si el libro ya ha sido reservado
    if (!libro.disponible) {
      throw new Error('Este libro ya ha sido reservado'); // Lanza un error si el libro no está disponible
    }

    // Crea una nueva instancia de Reserva
    const reserva = this.reservaRepository.create({
      ...createReservaDto,
      libro,
      usuario,
    });

    // Guarda la nueva reserva en la base de datos
    const savedReserva = await this.reservaRepository.save(reserva);

    // Marca el libro como no disponible
    libro.disponible = false; 
    await this.libroRepository.save(libro); // Guarda el cambio en el estado del libro

    return savedReserva; // Retorna la reserva guardada
  }

  // Método para obtener todas las reservas
  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find(); // Devuelve todas las reservas
  }

  // Método para encontrar una reserva específica por ID
  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada'); // Lanza un error si no se encuentra la reserva
    }
    return reserva; // Retorna la reserva encontrada
  }

  // Método para encontrar reservas por el ID de un libro
  async findByLibroId(libroId: number): Promise<Reserva[]> {
    return this.reservaRepository.find({ where: { libro: { id: libroId } }, relations: ['libro', 'usuario'] }); // Devuelve las reservas relacionadas con el libro
  }

  // Método para actualizar una reserva existente
  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id); // Busca la reserva a actualizar

    // Actualiza los campos de la reserva con los nuevos valores
    Object.assign(reserva, updateReservaDto);

    // Guarda la reserva actualizada en la base de datos
    return this.reservaRepository.save(reserva);
  }

  // Método para eliminar una reserva
  async remove(id: number): Promise<void> {
    // Busca la reserva antes de eliminarla, incluyendo la relación con el libro
    const reserva = await this.reservaRepository.findOne({ where: { id }, relations: ['libro'] });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada'); // Lanza un error si no se encuentra la reserva
    }

    // Marca el libro como disponible nuevamente
    const libro = reserva.libro;
    if (libro) {
      libro.disponible = true; // Restablece la disponibilidad del libro
      await this.libroRepository.save(libro); // Guarda el cambio en la disponibilidad del libro
    }

    // Elimina la reserva de la base de datos
    const result = await this.reservaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Reserva no encontrada'); // Lanza un error si no se pudo eliminar la reserva
    }
  }
}
