import { IsNotEmpty, IsOptional } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger'; 

// DTO para crear una nueva reserva
export class CreateReservaDto {
  @ApiProperty({ description: 'ID del libro asociado a la reserva', example: 1 })
  @IsNotEmpty() // Valida que este campo no esté vacío
  libroId: number; // Propiedad que representa el ID del libro

  @ApiProperty({ description: 'ID del usuario que realiza la reserva', example: 123 })
  @IsNotEmpty() // Valida que este campo no esté vacío
  usuarioId: number; // Propiedad que representa el ID del usuario

  @ApiProperty({ description: 'Fecha de la reserva', example: '2024-10-04T12:00:00Z' })
  @IsNotEmpty() // Valida que este campo no esté vacío
  fechaReserva: Date; // Propiedad que representa la fecha de la reserva
}

// DTO para actualizar una reserva, los campos son opcionales
export class UpdateReservaDto {
  @ApiProperty({ description: 'ID del libro asociado a la reserva', example: 1, required: false })
  @IsOptional() // Este campo es opcional
  libroId?: number; // Propiedad opcional que representa el ID del libro

  @ApiProperty({ description: 'ID del usuario que realiza la reserva', example: 123, required: false })
  @IsOptional() // Este campo es opcional
  usuarioId?: number; // Propiedad opcional que representa el ID del usuario

  @ApiProperty({ description: 'Fecha de la reserva', example: '2024-10-04T12:00:00Z', required: false })
  @IsOptional() // Este campo es opcional
  fechaReserva?: Date; // Propiedad opcional que representa la fecha de la reserva
}
