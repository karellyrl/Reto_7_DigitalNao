import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'; 
import { ApiProperty } from '@nestjs/swagger';  
import { Reserva } from '../../reserva/entities/reserva.entity'; 
import { Resena } from '../../reseña/entities/reseña.entity'; 

@Entity() // Marca la clase como una entidad de base de datos
export class Libro {
  @ApiProperty({ example: 1, description: 'El identificador único del libro' }) // Documenta el campo id
  @PrimaryGeneratedColumn() // Define la columna como una clave primaria generada automáticamente
  id: number;

  @ApiProperty({ example: 'Cien años de soledad', description: 'El título del libro' }) // Documenta el campo titulo
  @Column() 
  titulo: string;

  @ApiProperty({ example: 'Gabriel García Márquez', description: 'El autor del libro' }) // Documenta el campo autor
  @Column() 
  autor: string;

  @ApiProperty({ example: 'Realismo mágico', description: 'El género del libro' }) // Documenta el campo genero
  @Column() 
  genero: string;

  @ApiProperty({ example: true, description: 'Disponibilidad del libro' }) // Documenta el campo disponible
  @Column({ default: true })
  disponible: boolean;

  // Relación con Reservas
  @ApiProperty({ type: () => [Reserva], description: 'Reservas del libro' })  // Documenta la relación con Reserva
  @OneToMany(() => Reserva, (reserva) => reserva.libro) // Define la relación de uno a muchos
  reservas: Reserva[];

  // Relación con Reseñas
  @ApiProperty({ type: () => [Resena], description: 'Reseñas del libro' })  // Documenta la relación con Reseña
  @OneToMany(() => Resena, (reseña) => reseña.libro) // Define la relación de uno a muchos
  reseñas: Resena[];
}
