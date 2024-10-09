import { Controller, Get, Post, Delete, Param, Body, UseGuards, Patch, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from './reserva.entity';
import { CreateReservaDto, UpdateReservaDto } from './reserva.dto'; 
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reservas') // Etiqueta para agrupar los endpoints en Swagger
@ApiBearerAuth()
@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiResponse({ status: 201, description: 'Reserva creada con éxito.', type: Reserva })
  @ApiResponse({ status: 400, description: 'Error al crear la reserva.' })
  async create(@Body() createReservaDto: CreateReservaDto, @Res() res: Response): Promise<Response> {
    try {
      const nuevaReserva = await this.reservaService.create(createReservaDto);
      return res.status(201).json({ message: 'Reserva creada con éxito.', data: nuevaReserva });
    } catch (error) {
      if (error.message === 'Este libro ya ha sido reservado') {
        return res.status(400).json({ message: 'Este libro ya ha sido reservado.' });
      }
      throw new HttpException('Error al crear la reserva.', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('libro/:libroId')
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Obtener reservas por ID de libro' })
@ApiResponse({ status: 200, description: 'Lista de reservas para el libro especificado.', type: [Reserva] })
@ApiResponse({ status: 404, description: 'No se encontraron reservas para este libro.' })
async findByLibroId(@Param('libroId') libroId: number, @Res() res: Response): Promise<Response> {
  const reservas = await this.reservaService.findByLibroId(libroId);
  if (reservas && reservas.length > 0) {
    return res.status(200).json({ message: 'Lista de reservas para el libro especificado.', data: reservas });
  } else {
    return res.status(404).json({ message: 'No se encontraron reservas para este libro.' });
  }
}

  @Get()
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las reservas.', type: [Reserva] })
  async findAll(@Res() res: Response): Promise<Response> {
    const reservas = await this.reservaService.findAll();
    return res.status(200).json({ message: 'Lista de todas las reservas.', data: reservas });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    const reserva = await this.reservaService.findOne(id);
    if (reserva) {
      return res.status(200).json({ message: 'Reserva encontrada.', data: reserva });
    } else {
      throw new HttpException('Reserva no encontrada.', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id') // Método para actualizar la reserva
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Actualizar una reserva por ID' })
  @ApiResponse({ status: 200, description: 'Reserva actualizada con éxito.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  async update(@Param('id') id: number, @Body() updateReservaDto: UpdateReservaDto, @Res() res: Response): Promise<Response> {
    const reservaActualizada = await this.reservaService.update(id, updateReservaDto);
    if (reservaActualizada) {
      return res.status(200).json({ message: 'Reserva actualizada con éxito.', data: reservaActualizada });
    } else {
      throw new HttpException('Reserva no encontrada.', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Eliminar una reserva por ID' })
  @ApiResponse({ status: 200, description: 'Reserva eliminada con éxito.' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  async remove(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      await this.reservaService.remove(id);
      return res.status(200).json({ message: 'Reserva eliminada con éxito' });
    } catch (error) {
      throw new HttpException('Reserva no encontrada.', HttpStatus.NOT_FOUND);
    }
  }
  
}
