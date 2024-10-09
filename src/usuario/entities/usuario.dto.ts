import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Email del usuario', example: 'usuario@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'contraseña123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Estado activo del usuario', example: true, required: false })
  @IsBoolean()
  activo?: boolean; // Este campo es opcional y por defecto será true en el entity
}

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'Email del usuario', example: 'usuario@example.com', required: false })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'nuevaContraseña123', required: false })
  @IsNotEmpty()
  password?: string;

  @ApiProperty({ description: 'Estado activo del usuario', example: true, required: false })
  @IsBoolean()
  activo?: boolean;
}
