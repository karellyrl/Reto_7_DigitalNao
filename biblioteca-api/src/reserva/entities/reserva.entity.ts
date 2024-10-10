import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; 
import { Usuario } from '../../usuario/entities/usuario.entity'; 
import { Libro } from '../../libro/entities/libro.entity';

@Entity() 
export class Reserva {

  @ApiProperty({ example: 1, description: 'El identificador único de la reserva' })
  @PrimaryGeneratedColumn() // Indica que esta columna es la clave primaria y se generará automáticamente
  id: number;

  @ApiProperty({ type: () => Libro, description: 'El libro que se ha reservado' })
  @ManyToOne(() => Libro, (libro) => libro.id, { eager: true }) // Relación muchos a uno con la entidad Libro
  libro: Libro; // Propiedad que representa el libro asociado a la reserva

  @ApiProperty({ type: () => Usuario, description: 'El usuario que ha realizado la reserva' })
  @ManyToOne(() => Usuario, (usuario) => usuario.id, { eager: true }) // Relación muchos a uno con la entidad Usuario
  usuario: Usuario; // Propiedad que representa el usuario que realiza la reserva

  @ApiProperty({ example: '2024-01-01', description: 'La fecha en la que se realizó la reserva' })
  @Column() // Indica que esta propiedad es una columna en la base de datos
  fechaReserva: Date; // Propiedad que representa la fecha de la reserva

  @ApiProperty({ example: true, description: 'Indica si la reserva está activa o no' })
  @Column({ default: true }) // Tiene un valor por defecto de true
  activo: boolean; // Propiedad que indica si la reserva está activa
}
