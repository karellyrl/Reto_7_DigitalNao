import { IsString, IsBoolean, IsOptional } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger'; 

// Clase para crear un nuevo libro
export class CreateLibroDto {
  @ApiProperty({ description: 'Título del libro', example: 'El Principito' }) // Documenta el campo título
  @IsString() // Valida que el título sea una cadena
  titulo: string; // Título del libro

  @ApiProperty({ description: 'Autor del libro', example: 'Antoine de Saint-Exupéry' }) // Documenta el campo autor
  @IsString() // Valida que el autor sea una cadena
  autor: string; // Autor del libro

  @ApiProperty({ description: 'Género del libro', example: 'Fantasía' }) // Documenta el campo género
  @IsString() // Valida que el género sea una cadena
  genero: string; // Género del libro

  @ApiProperty({ description: 'Disponibilidad del libro', example: true, required: false }) // Documenta el campo de disponibilidad
  @IsBoolean() // Valida que el campo disponible sea un booleano
  @IsOptional() 
  disponible?: boolean; 
}

// Clase para actualizar un libro existente
export class UpdateLibroDto {
  @ApiProperty({ description: 'Título del libro', example: 'El Principito', required: false }) // Documenta el campo título
  @IsString() // Valida que el título sea una cadena
  @IsOptional() 
  titulo?: string; // Título del libro

  @ApiProperty({ description: 'Autor del libro', example: 'Antoine de Saint-Exupéry', required: false }) // Documenta el campo autor
  @IsString() // Valida que el autor sea una cadena
  @IsOptional() 
  autor?: string; // Autor del libro

  @ApiProperty({ description: 'Género del libro', example: 'Fantasía', required: false }) // Documenta el campo género
  @IsString() // Valida que el género sea una cadena
  @IsOptional() 
  genero?: string; // Género del libro

  @ApiProperty({ description: 'Disponibilidad del libro', example: true, required: false }) // Documenta el campo de disponibilidad
  @IsBoolean() // Valida que el campo disponible sea un booleano
  @IsOptional() 
  disponible?: boolean; 
}
