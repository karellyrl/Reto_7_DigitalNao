import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Res, HttpException, HttpStatus } from '@nestjs/common'; 
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; 
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuarios') // Etiqueta para agrupar los endpoints en Swagger
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Obtener todos los usuarios
  @Get()
  @UseGuards(JwtAuthGuard) // Protege esta ruta
  @ApiBearerAuth() // Indica que esta ruta requiere autenticación JWT
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos con éxito.' })
  async getAllUsuarios(@Res() res: Response): Promise<Response> {
    const usuarios = await this.usuarioService.findAll();
    return res.status(200).json({ message: 'Usuarios obtenidos con éxito.', data: usuarios });
  }

  // Crear un nuevo usuario
  @Post()
  // No se protege esta ruta para permitir que los usuarios se registren sin estar autenticados
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito.', type: Usuario })
  @ApiResponse({ status: 400, description: 'Error al crear el usuario.' })
  async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res: Response): Promise<Response> {
    try {
      const newUser = await this.usuarioService.create(createUsuarioDto);
      return res.status(201).json({ message: 'Usuario creado con éxito.', data: newUser });
    } catch (error) {
      throw new HttpException('Error al crear el usuario.', HttpStatus.BAD_REQUEST);
    }
  }

  // Obtener un usuario por ID
  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protege esta ruta
  @ApiBearerAuth() // Indica que esta ruta requiere autenticación JWT
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado con éxito.', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async getUsuario(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const usuario = await this.usuarioService.findOne(id);
    if (!usuario) {
      return res.status(404).json({ message: `Usuario no encontrado.` });
    }
    return res.status(200).json({ message: 'Usuario encontrado con éxito.', data: usuario });
  }

  // Actualizar un usuario por ID
  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protege esta ruta
  @ApiBearerAuth() // Indica que esta ruta requiere autenticación JWT
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async updateUsuario(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Res() res: Response): Promise<Response> {
    const updatedUser = await this.usuarioService.update(id, updateUsuarioDto);
    if (!updatedUser) {
      return res.status(404).json({ message: `Usuario no encontrado.` });
    }
    return res.status(200).json({ message: 'Usuario actualizado con éxito.', data: updatedUser });
  }

  // Eliminar un usuario por ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protege esta ruta
  @ApiBearerAuth() // Indica que esta ruta requiere autenticación JWT
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async deleteUsuario(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      await this.usuarioService.remove(id); // Pasar el id como string
      return res.status(200).json({ message: `Usuario eliminado con éxito.` });
    } catch (error) {
      return res.status(404).json({ message: `Usuario no encontrado.` });
    }
  }
}
