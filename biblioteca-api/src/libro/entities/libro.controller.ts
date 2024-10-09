import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Res, HttpException, HttpStatus } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from './libro.entity';
import { CreateLibroDto, UpdateLibroDto } from './libro.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; // Importa el guard de JWT
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Libros') // Etiqueta para agrupar los endpoints en Swagger
@ApiBearerAuth()
@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener todos los libros' })
  @ApiResponse({ status: 200, description: 'Libros obtenidos con éxito.' })
  async findAll(@Res() res: Response): Promise<Response> {
    const libros = await this.libroService.findAll();
    return res.status(200).json({ message: 'Libros obtenidos con éxito.', data: libros });
  }

  @Get('buscar')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar libros por título, autor o género' })
  @ApiResponse({ status: 200, description: 'Libros filtrados obtenidos con éxito.' })
  @ApiResponse({ status: 404, description: 'Libros no encontrados.' })
  @ApiQuery({ name: 'titulo', required: false, type: String })
  @ApiQuery({ name: 'autor', required: false, type: String })
  @ApiQuery({ name: 'genero', required: false, type: String })
  async search(
    @Query('titulo') titulo?: string, 
    @Query('autor') autor?: string, 
    @Query('genero') genero?: string
  ): Promise<{ message: string, data: Libro[] }> {
    const libros = await this.libroService.findFiltered(titulo, autor, genero);
    
    if (libros.length === 0) {
      throw new HttpException('Libros no encontrados.', HttpStatus.NOT_FOUND);
    }
  
    return { message: 'Libros filtrados obtenidos con éxito.', data: libros };
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  @ApiResponse({ status: 200, description: 'Libro encontrado con éxito.', type: Libro })
  @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    const libro = await this.libroService.findOne(id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado.' });
    }
    return res.status(200).json({ message: 'Libro encontrado con éxito.', data: libro });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro creado con éxito.', type: Libro })
  @ApiResponse({ status: 400, description: 'Error al crear el libro.' })
  async create(@Body() createLibroDto: CreateLibroDto, @Res() res: Response): Promise<Response> {
    try {
      const newLibro = await this.libroService.create(createLibroDto);
      return res.status(201).json({ message: 'Libro creado con éxito.', data: newLibro });
    } catch (error) {
      throw new HttpException('Error al crear el libro.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar un libro por ID' })
  @ApiResponse({ status: 200, description: 'Libro actualizado con éxito.', type: Libro })
  @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
  async update(@Param('id') id: number, @Body() updateLibroDto: UpdateLibroDto, @Res() res: Response): Promise<Response> {
    const updatedLibro = await this.libroService.update(id, updateLibroDto);
    if (!updatedLibro) {
      return res.status(404).json({ message: 'Libro no encontrado.' });
    }
    return res.status(200).json({ message: 'Libro actualizado con éxito.', data: updatedLibro });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar un libro por ID' })
  @ApiResponse({ status: 200, description: 'Libro eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
  async remove(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      await this.libroService.remove(id);
      return res.status(200).json({ message: 'Libro eliminado con éxito.' });
    } catch (error) {
      return res.status(404).json({ message: 'Libro no encontrado.' });
    }
  }
}
