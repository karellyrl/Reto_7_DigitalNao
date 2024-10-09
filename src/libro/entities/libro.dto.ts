import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibroDto {
  @ApiProperty({ description: 'Título del libro', example: 'El Principito' })
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Autor del libro', example: 'Antoine de Saint-Exupéry' })
  @IsString()
  autor: string;

  @ApiProperty({ description: 'Género del libro', example: 'Fantasía' })
  @IsString()
  genero: string;

  @ApiProperty({ description: 'Disponibilidad del libro', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean; // Campo opcional, por defecto será true
}

export class UpdateLibroDto {
  @ApiProperty({ description: 'Título del libro', example: 'El Principito', required: false })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({ description: 'Autor del libro', example: 'Antoine de Saint-Exupéry', required: false })
  @IsString()
  @IsOptional()
  autor?: string;

  @ApiProperty({ description: 'Género del libro', example: 'Fantasía', required: false })
  @IsString()
  @IsOptional()
  genero?: string;

  @ApiProperty({ description: 'Disponibilidad del libro', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
