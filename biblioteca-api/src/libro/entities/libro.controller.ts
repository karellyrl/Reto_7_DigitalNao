import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Res, HttpException, HttpStatus } from '@nestjs/common'; 
import { LibroService } from './libro.service'; 
import { Libro } from './libro.entity'; 
import { CreateLibroDto, UpdateLibroDto } from './libro.dto'; 
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Response } from 'express'; 
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'; 

@ApiTags('Libros') // Etiqueta para agrupar los endpoints en Swagger
@ApiBearerAuth() // Indica que los endpoints requieren autenticación Bearer
@Controller('libros') // Define el controlador para la ruta 'libros'
export class LibroController {
  constructor(private readonly libroService: LibroService) {} // Inyecta el servicio de libros

  // Endpoint para obtener todos los libros
  @Get()
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Obtener todos los libros' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Libros obtenidos con éxito.' }) 
  async findAll(@Res() res: Response): Promise<Response> {
    const libros = await this.libroService.findAll(); // Llama al servicio para obtener todos los libros
    return res.status(200).json({ message: 'Libros obtenidos con éxito.', data: libros }); 
  }

  // Endpoint para buscar libros por título, autor o género
  @Get('buscar')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Buscar libros por título, autor o género' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Libros filtrados obtenidos con éxito.' }) 
  @ApiResponse({ status: 404, description: 'Libros no encontrados.' })
  @ApiQuery({ name: 'titulo', required: false, type: String }) 
  @ApiQuery({ name: 'autor', required: false, type: String }) 
  @ApiQuery({ name: 'genero', required: false, type: String })
  async search(
    @Query('titulo') titulo?: string, // Recibe el título de la consulta
    @Query('autor') autor?: string, // Recibe el autor de la consulta
    @Query('genero') genero?: string // Recibe el género de la consulta
  ): Promise<{ message: string, data: Libro[] }> {
    const libros = await this.libroService.findFiltered(titulo, autor, genero); // Llama al servicio para buscar libros filtrados
    
    if (libros.length === 0) { // Si no se encuentran libros
      throw new HttpException('Libros no encontrados.', HttpStatus.NOT_FOUND); 
    }
  
    return { message: 'Libros filtrados obtenidos con éxito.', data: libros }; 
  }

  // Endpoint para obtener un libro por ID
  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Obtener un libro por ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Libro encontrado con éxito.', type: Libro }) 
  @ApiResponse({ status: 404, description: 'Libro no encontrado.' }) 
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    const libro = await this.libroService.findOne(id); // Llama al servicio para encontrar el libro por ID
    if (!libro) { // Si no se encuentra el libro
      return res.status(404).json({ message: 'Libro no encontrado.' }); 
    }
    return res.status(200).json({ message: 'Libro encontrado con éxito.', data: libro }); 
  }

  // Endpoint para crear un nuevo libro
  @Post()
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Crear un nuevo libro' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Libro creado con éxito.', type: Libro })
  @ApiResponse({ status: 400, description: 'Error al crear el libro.' }) 
  async create(@Body() createLibroDto: CreateLibroDto, @Res() res: Response): Promise<Response> {
    try {
      const newLibro = await this.libroService.create(createLibroDto); // Llama al servicio para crear el libro
      return res.status(201).json({ message: 'Libro creado con éxito.', data: newLibro }); 
    } catch (error) { // Manejo de errores
      throw new HttpException('Error al crear el libro.', HttpStatus.BAD_REQUEST); 
    }
  }

  // Endpoint para actualizar un libro por ID
  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Actualizar un libro por ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Libro actualizado con éxito.', type: Libro }) 
  @ApiResponse({ status: 404, description: 'Libro no encontrado.' }) 
  async update(@Param('id') id: number, @Body() updateLibroDto: UpdateLibroDto, @Res() res: Response): Promise<Response> {
    const updatedLibro = await this.libroService.update(id, updateLibroDto); // Llama al servicio para actualizar el libro
    if (!updatedLibro) { // Si no se encuentra el libro
      return res.status(404).json({ message: 'Libro no encontrado.' }); 
    }
    return res.status(200).json({ message: 'Libro actualizado con éxito.', data: updatedLibro }); 
  }

  // Endpoint para eliminar un libro por ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  @ApiOperation({ summary: 'Eliminar un libro por ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Libro eliminado con éxito.' }) 
  @ApiResponse({ status: 404, description: 'Libro no encontrado.' }) 
  async remove(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      await this.libroService.remove(id); // Llama al servicio para eliminar el libro
      return res.status(200).json({ message: 'Libro eliminado con éxito.' }); 
    } catch (error) { // Manejo de errores
      return res.status(404).json({ message: 'Libro no encontrado.' }); 
    }
  }
}
