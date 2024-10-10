// src/libro/entities/libro.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Libro } from './libro.entity'; 
import { CreateLibroDto, UpdateLibroDto } from './libro.dto'; 

@Injectable() 
export class LibroService {
  constructor(
    @InjectRepository(Libro) 
    private libroRepository: Repository<Libro>,
  ) {}

  // Obtener todos los libros sin filtros
  async findAll(): Promise<Libro[]> {
    return await this.libroRepository.find(); // Retorna todos los libros de la base de datos
  }

  // Método para buscar libros con filtros opcionales
  async findFiltered(titulo?: string, autor?: string, genero?: string): Promise<Libro[]> {
    const query = this.libroRepository.createQueryBuilder('libro'); // Crea un query builder para la entidad Libro
  
    // Agrega condiciones al query si se proporcionan filtros
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
    return libros; // Retorna los libros filtrados
  }

  // Obtener un libro por ID
  async findOne(id: number): Promise<Libro> {
    return this.libroRepository.findOne({
      where: { id },
      relations: ['reservas', 'reseñas'],  // Incluir las relaciones para obtener reservas y reseñas asociadas
    });
  }

  // Crear un nuevo libro en la base de datos
  create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const libro = this.libroRepository.create(createLibroDto); // Crea una nueva instancia de Libro a partir del DTO
    return this.libroRepository.save(libro); // Guarda el libro en la base de datos
  }

  // Actualizar un libro existente
  async update(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    const libroExistente = await this.libroRepository.findOne({ where: { id } }); // Busca el libro por ID
    
    if (!libroExistente) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`); 
    }
  
    // Actualiza el libro con los nuevos datos
    await this.libroRepository.update(id, updateLibroDto);
  
    // Devuelve el libro actualizado
    return this.libroRepository.findOne({ where: { id } });
  }

  // Eliminar un libro por ID
  async remove(id: number): Promise<void> {
    const result = await this.libroRepository.delete(id); // Intenta eliminar el libro
    if (result.affected === 0) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`); 
    }
  }
}
