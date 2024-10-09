import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';  // Importar el decorador ApiProperty
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Libro } from '../../libro/entities/libro.entity';

@Entity()
export class Reserva {

  @ApiProperty({ example: 1, description: 'El identificador único de la reserva' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Libro, description: 'El libro que se ha reservado' })
  @ManyToOne(() => Libro, (libro) => libro.id, { eager: true })
  libro: Libro;

  @ApiProperty({ type: () => Usuario, description: 'El usuario que ha realizado la reserva' })
  @ManyToOne(() => Usuario, (usuario) => usuario.id, { eager: true })
  usuario: Usuario;

  @ApiProperty({ example: '2024-01-01', description: 'La fecha en la que se realizó la reserva' })
  @Column()
  fechaReserva: Date;

  @ApiProperty({ example: true, description: 'Indica si la reserva está activa o no' })
  @Column({ default: true })
  activo: boolean;
}
