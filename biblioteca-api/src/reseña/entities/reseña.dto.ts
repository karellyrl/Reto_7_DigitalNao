import { IsNotEmpty, IsOptional } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger'; 

// DTO para crear una reseña
export class CreateResenaDto {
  @ApiProperty({ description: 'ID del libro asociado a la reseña', example: 1 }) // Propiedad para Swagger
  @IsNotEmpty() // Valida que el campo no esté vacío
  libroId: number; // ID del libro

  @ApiProperty({ description: 'ID del usuario que creó la reseña', example: 123 }) // Propiedad para Swagger
  @IsNotEmpty() // Valida que el campo no esté vacío
  usuarioId: number; // ID del usuario que crea la reseña

  @ApiProperty({ description: 'Comentario de la reseña', example: 'Excelente libro, lo recomiendo.' }) // Propiedad para Swagger
  @IsNotEmpty() // Valida que el campo no esté vacío
  comentario: string; // Comentario de la reseña

  @ApiProperty({ description: 'Calificación de la reseña (1 a 5)', example: 5 }) // Propiedad para Swagger
  @IsNotEmpty() // Valida que el campo no esté vacío
  calificacion: number; // Calificación otorgada al libro (de 1 a 5)

  @ApiProperty({ description: 'Fecha de la reseña', example: '2024-10-04T12:00:00Z' }) // Propiedad para Swagger
  @IsNotEmpty() // Valida que el campo no esté vacío
  fecha: Date; // Fecha en que se crea la reseña
}

// DTO para actualizar una reseña, todos los campos son opcionales
export class UpdateResenaDto {
  @ApiProperty({ description: 'Comentario de la reseña', example: 'Actualización del comentario.', required: false }) // Propiedad para Swagger
  @IsOptional() // Este campo es opcional
  comentario?: string; // Comentario de la reseña

  @ApiProperty({ description: 'Calificación de la reseña (1 a 5)', example: 4, required: false }) // Propiedad para Swagger
  @IsOptional() // Este campo es opcional
  calificacion?: number; // Calificación de la reseña

  @ApiProperty({ description: 'Fecha de la reseña', example: '2024-10-04T12:00:00Z', required: false }) // Propiedad para Swagger
  @IsOptional() // Este campo es opcional
  fecha?: Date; // Fecha de la reseña
}
