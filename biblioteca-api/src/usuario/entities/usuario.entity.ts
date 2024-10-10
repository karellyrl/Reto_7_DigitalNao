import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer'; 
import { ApiProperty } from '@nestjs/swagger'; 

@Entity() 
export class Usuario {

  // Decorador para el ID del usuario, que es un UUID
  @ApiProperty({ 
    example: '123e4567-e89b-12d3-a456-426614174000', 
    description: 'El identificador único del usuario (UUID)' 
  })
  @PrimaryGeneratedColumn('uuid') // Genera un ID único automáticamente como UUID
  id: string; 

  // Decorador para el correo electrónico del usuario
  @ApiProperty({ 
    example: 'usuario@example.com', 
    description: 'El correo electrónico del usuario, único en la base de datos' 
  })
  @Column({ unique: true }) // El correo debe ser único en la base de datos
  email: string;

  // Decorador para la contraseña del usuario
  @ApiProperty({ 
    example: 'password123', 
    description: 'La contraseña del usuario (oculta en respuestas)' 
  })
  @Column() // Define la columna en la base de datos
  @Exclude() // Excluye la contraseña de las respuestas en la API
  password: string;

  // Decorador para indicar si el usuario está activo
  @ApiProperty({ 
    example: true, 
    description: 'Indica si el usuario está activo o no' 
  })
  @Column({ default: true }) // La columna tiene un valor por defecto de true
  activo: boolean;
}
