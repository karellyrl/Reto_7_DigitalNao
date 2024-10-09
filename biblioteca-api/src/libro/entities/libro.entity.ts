import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';  // Importar el decorador ApiProperty
import { Reserva } from '../../reserva/entities/reserva.entity';
import { Resena } from '../../reseña/entities/reseña.entity';

@Entity()
export class Libro {
  @ApiProperty({ example: 1, description: 'El identificador único del libro' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Cien años de soledad', description: 'El título del libro' })
  @Column()
  titulo: string;

  @ApiProperty({ example: 'Gabriel García Márquez', description: 'El autor del libro' })
  @Column()
  autor: string;

  @ApiProperty({ example: 'Realismo mágico', description: 'El género del libro' })
  @Column()
  genero: string;

  @ApiProperty({ example: true, description: 'Disponibilidad del libro' })
  @Column({ default: true })
  disponible: boolean;

  // Relación con Reservas
  @ApiProperty({ type: () => [Reserva], description: 'Reservas del libro' })  // Si reservas es un array de Reserva
  @OneToMany(() => Reserva, (reserva) => reserva.libro)
  reservas: Reserva[];

  // Relación con Reseñas
  @ApiProperty({ type: () => [Resena], description: 'Reseñas del libro' })  // Si reseñas es un array de Reseña
  @OneToMany(() => Resena, (reseña) => reseña.libro)
  reseñas: Resena[];
}
