import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger'; 

// DTO para la creación de un nuevo usuario
export class CreateUsuarioDto {
  @ApiProperty({ description: 'Email del usuario', example: 'usuario@example.com' })
  @IsEmail() // Valida que el campo sea un email valido
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'contraseña123' })
  @IsNotEmpty() // Asegura que la contraseña no esté vacía
  password: string;

  @ApiProperty({ description: 'Estado activo del usuario', example: true, required: false })
  @IsBoolean() // Valida que el campo sea un booleano
  activo?: boolean; // Este campo es opcional y por defecto será true en el entity
}

// DTO para la actualización de un usuario existente
export class UpdateUsuarioDto {
  @ApiProperty({ description: 'Email del usuario', example: 'usuario@example.com', required: false })
  @IsEmail() // Valida que el campo sea un email válido
  email?: string; // Campo opcional para actualizar el email

  @ApiProperty({ description: 'Contraseña del usuario', example: 'nuevaContraseña123', required: false })
  @IsNotEmpty() // Asegura que la contraseña no esté vacía
  password?: string; // Campo opcional para actualizar la contraseña

  @ApiProperty({ description: 'Estado activo del usuario', example: true, required: false })
  @IsBoolean() // Valida que el campo sea un booleano
  activo?: boolean; // Campo opcional para actualizar el estado activo
}
