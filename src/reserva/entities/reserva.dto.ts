import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ description: 'ID del libro asociado a la reserva', example: 1 })
  @IsNotEmpty()
  libroId: number;

  @ApiProperty({ description: 'ID del usuario que realiza la reserva', example: 123 })
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ description: 'Fecha de la reserva', example: '2024-10-04T12:00:00Z' })
  @IsNotEmpty()
  fechaReserva: Date;
}

// DTO para actualizar una reserva, los campos son opcionales
export class UpdateReservaDto {
  @ApiProperty({ description: 'ID del libro asociado a la reserva', example: 1, required: false })
  @IsOptional()
  libroId?: number;

  @ApiProperty({ description: 'ID del usuario que realiza la reserva', example: 123, required: false })
  @IsOptional()
  usuarioId?: number;

  @ApiProperty({ description: 'Fecha de la reserva', example: '2024-10-04T12:00:00Z', required: false })
  @IsOptional()
  fechaReserva?: Date; // Puedes usar el mismo tipo que el de creación
}
