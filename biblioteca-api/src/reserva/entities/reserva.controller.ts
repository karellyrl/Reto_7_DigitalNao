import { Controller, Get, Post, Delete, Param, Body, UseGuards, Patch, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from './reserva.entity';
import { CreateReservaDto, UpdateReservaDto } from './reserva.dto'; 
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reservas') // Etiqueta para agrupar los endpoints en Swagger
@ApiBearerAuth() // Indica que se requiere autenticación Bearer
@Controller('reservas') // Define la ruta base para este controlador
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {} 

  // Endpoint para crear una nueva reserva
  @Post()
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Crear una nueva reserva' }) // Descripción de la operación en Swagger
  @ApiResponse({ status: 201, description: 'Reserva creada con éxito.', type: Reserva }) 
  @ApiResponse({ status: 400, description: 'Error al crear la reserva.' }) 
  async create(@Body() createReservaDto: CreateReservaDto, @Res() res: Response): Promise<Response> {
    try {
      const nuevaReserva = await this.reservaService.create(createReservaDto); // Crear la reserva usando el servicio
      return res.status(201).json({ message: 'Reserva creada con éxito.', data: nuevaReserva }); 
    } catch (error) {
      // Manejo de errores
      if (error.message === 'Este libro ya ha sido reservado') {
        return res.status(400).json({ message: 'Este libro ya ha sido reservado.' }); 
      }
      throw new HttpException('Error al crear la reserva.', HttpStatus.BAD_REQUEST); 
    }
  }

  // Endpoint para obtener reservas por ID de libro
  @Get('libro/:libroId')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Obtener reservas por ID de libro' }) // Descripción de la operación en Swagger
  @ApiResponse({ status: 200, description: 'Lista de reservas para el libro especificado.', type: [Reserva] }) 
  @ApiResponse({ status: 404, description: 'No se encontraron reservas para este libro.' }) 
  async findByLibroId(@Param('libroId') libroId: number, @Res() res: Response): Promise<Response> {
    const reservas = await this.reservaService.findByLibroId(libroId); // Obtener reservas usando el servicio
    if (reservas && reservas.length > 0) {
      return res.status(200).json({ message: 'Lista de reservas para el libro especificado.', data: reservas });
    } else {
      return res.status(404).json({ message: 'No se encontraron reservas para este libro.' }); 
    }
  }

  // Endpoint para obtener todas las reservas
  @Get()
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Obtener todas las reservas' }) // Descripción de la operación en Swagger
  @ApiResponse({ status: 200, description: 'Lista de todas las reservas.', type: [Reserva] }) 
  async findAll(@Res() res: Response): Promise<Response> {
    const reservas = await this.reservaService.findAll(); 
    return res.status(200).json({ message: 'Lista de todas las reservas.', data: reservas }); 
  }

  // Endpoint para obtener una reserva por ID
  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Obtener una reserva por ID' }) // Descripción de la operación en Swagger
  @ApiResponse({ status: 200, description: 'Reserva encontrada.', type: Reserva }) 
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' }) 
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    const reserva = await this.reservaService.findOne(id); // Obtener la reserva usando el servicio
    if (reserva) {
      return res.status(200).json({ message: 'Reserva encontrada.', data: reserva }); 
    } else {
      throw new HttpException('Reserva no encontrada.', HttpStatus.NOT_FOUND); 
    }
  }

  // Endpoint para actualizar una reserva
  @Patch(':id') 
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Actualizar una reserva por ID' }) // Descripción de la operación en Swagger
  @ApiResponse({ status: 200, description: 'Reserva actualizada con éxito.', type: Reserva }) 
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' }) 
  async update(@Param('id') id: number, @Body() updateReservaDto: UpdateReservaDto, @Res() res: Response): Promise<Response> {
    const reservaActualizada = await this.reservaService.update(id, updateReservaDto); // Actualizar la reserva usando el servicio
    if (reservaActualizada) {
      return res.status(200).json({ message: 'Reserva actualizada con éxito.', data: reservaActualizada }); 
    } else {
      throw new HttpException('Reserva no encontrada.', HttpStatus.NOT_FOUND); 
    }
  }

  // Endpoint para eliminar una reserva
  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Eliminar una reserva por ID' }) // Descripción de la operación en Swagger
  @ApiResponse({ status: 200, description: 'Reserva eliminada con éxito.' }) 
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' }) 
  async remove(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      await this.reservaService.remove(id); // Eliminar la reserva usando el servicio
      return res.status(200).json({ message: 'Reserva eliminada con éxito' }); 
    } catch (error) {
      throw new HttpException('Reserva no encontrada.', HttpStatus.NOT_FOUND); 
    }
  }
}
