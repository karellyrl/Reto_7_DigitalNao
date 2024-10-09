// src/libro/entities/libro.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';
import { CreateLibroDto, UpdateLibroDto } from './libro.dto'; // Importa los DTOs

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
  ) {}

  // Obtener todos los libros sin filtros
  async findAll(): Promise<Libro[]> {
    return await this.libroRepository.find();
  }

  async findFiltered(titulo?: string, autor?: string, genero?: string): Promise<Libro[]> {
    const query = this.libroRepository.createQueryBuilder('libro');
  
    if (titulo) {
      query.andWhere('libro.titulo LIKE :titulo', { titulo: `%${titulo}%` });
    }
    if (autor) {
      query.andWhere('libro.autor LIKE :autor', { autor: `%${autor}%` });
    }
    if (genero) {
      query.andWhere('libro.genero LIKE :genero', { genero: `%${genero}%` });
    }
  
    // Ejecutamos la consulta y obtenemos los resultados
    const libros = await query.getMany();
    return libros;
  }

  async findOne(id: number): Promise<Libro> {
    return this.libroRepository.findOne({
      where: { id },
      relations: ['reservas', 'reseñas'],  // Incluir las relaciones
    });
  }

  create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const libro = this.libroRepository.create(createLibroDto); // Crea una nueva instancia de Libro
    return this.libroRepository.save(libro);
  }

  async update(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    const libroExistente = await this.libroRepository.findOne({ where: { id } });
    
    if (!libroExistente) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
  
    // Actualiza el libro
    await this.libroRepository.update(id, updateLibroDto);
  
    // Devuelve el libro actualizado
    return this.libroRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.libroRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
  }
}
