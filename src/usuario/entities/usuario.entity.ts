import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';  // Importar ApiProperty

@Entity()
export class Usuario {

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'El identificador único del usuario (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;  // Cambié de number a string para UUID

  @ApiProperty({ example: 'usuario@example.com', description: 'El correo electrónico del usuario, único en la base de datos' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'password123', description: 'La contraseña del usuario (oculta en respuestas)' })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo o no' })
  @Column({ default: true })
  activo: boolean;
}
