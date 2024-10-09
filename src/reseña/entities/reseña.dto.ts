import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResenaDto {
  @ApiProperty({ description: 'ID del libro asociado a la reseña', example: 1 })
  @IsNotEmpty()
  libroId: number;

  @ApiProperty({ description: 'ID del usuario que creó la reseña', example: 123 })
  @IsNotEmpty()
  usuarioId: number; // Cambiado a string para reflejar el ID de usuario en JWT

  @ApiProperty({ description: 'Comentario de la reseña', example: 'Excelente libro, lo recomiendo.' })
  @IsNotEmpty()
  comentario: string;

  @ApiProperty({ description: 'Calificación de la reseña (1 a 5)', example: 5 })
  @IsNotEmpty()
  calificacion: number; // Añadido para la calificación de la reseña

  @ApiProperty({ description: 'Fecha de la reseña', example: '2024-10-04T12:00:00Z' })
  @IsNotEmpty()
  fecha: Date; // Mantener la fecha si es necesario, o eliminar si no se usa
}

// DTO para actualizar una reseña, los campos son opcionales
export class UpdateResenaDto {
  @ApiProperty({ description: 'Comentario de la reseña', example: 'Actualización del comentario.', required: false })
  @IsOptional()
  comentario?: string;

  @ApiProperty({ description: 'Calificación de la reseña (1 a 5)', example: 4, required: false })
  @IsOptional()
  calificacion?: number;

  @ApiProperty({ description: 'Fecha de la reseña', example: '2024-10-04T12:00:00Z', required: false })
  @IsOptional()
  fecha?: Date; // Este campo también es opcional en caso de que se quiera actualizar la fecha
}
