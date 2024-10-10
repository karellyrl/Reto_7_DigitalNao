import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';  
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Libro } from '../../libro/entities/libro.entity';

@Entity() // Define la clase como una entidad de la base de datos
export class Resena {
  
  @ApiProperty({ example: 1, description: 'El identificador único de la reseña' }) // Propiedad para Swagger
  @PrimaryGeneratedColumn() // Define la columna como clave primaria autogenerada
  id: number;

  @ApiProperty({ example: 'Me encantó el libro', description: 'El comentario de la reseña' }) // Propiedad para Swagger
  @Column() // Define la columna en la base de datos
  comentario: string;

  @ApiProperty({ example: 5, description: 'La calificación dada al libro, del 1 al 5' }) // Propiedad para Swagger
  @Column() // Define la columna en la base de datos
  calificacion: number;

  @ApiProperty({ type: () => Usuario, description: 'El usuario que escribió la reseña' }) // Propiedad para Swagger
  @ManyToOne(() => Usuario, (usuario) => usuario.id, { eager: true }) // Define una relación muchos a uno con Usuario
  usuario: Usuario; // Referencia al usuario que escribió la reseña

  @ApiProperty({ type: () => Libro, description: 'El libro al que pertenece la reseña' }) // Propiedad para Swagger
  @ManyToOne(() => Libro, (libro) => libro.id, { eager: true }) // Define una relación muchos a uno con Libro
  libro: Libro; // Referencia al libro relacionado con la reseña

  @ApiProperty({ example: '2024-01-01', description: 'La fecha en que se escribió la reseña' }) // Propiedad para Swagger
  @Column() // Define la columna en la base de datos
  fecha: Date; // Almacena la fecha de creación de la reseña
}
