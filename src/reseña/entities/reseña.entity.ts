import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';  // Importar el decorador ApiProperty
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Libro } from '../../libro/entities/libro.entity';

@Entity()
export class Resena {
  
  @ApiProperty({ example: 1, description: 'El identificador único de la reseña' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Me encantó el libro', description: 'El comentario de la reseña' })
  @Column()
  comentario: string;

  @ApiProperty({ example: 5, description: 'La calificación dada al libro, del 1 al 5' })
  @Column()
  calificacion: number;

  @ApiProperty({ type: () => Usuario, description: 'El usuario que escribió la reseña' })
  @ManyToOne(() => Usuario, (usuario) => usuario.id, { eager: true })
  usuario: Usuario;

  @ApiProperty({ type: () => Libro, description: 'El libro al que pertenece la reseña' })
  @ManyToOne(() => Libro, (libro) => libro.id, { eager: true })
  libro: Libro;

  @ApiProperty({ example: '2024-01-01', description: 'La fecha en que se escribió la reseña' })
  @Column()
  fecha: Date;
}
