import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseñaController } from './entities/reseña.controller';
import { ReseñaService } from './entities/reseña.service';
import { Resena } from './entities/reseña.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resena, Usuario])], // Importa las entidades Resena y Usuario para su uso en el módulo
  controllers: [ReseñaController], // Declara el controlador de reseñas que maneja las peticiones
  providers: [ReseñaService], // Declara el servicio de reseñas que contiene la lógica de negocio
})
export class ReseñaModule {} // Exporta el módulo de reseñas para su uso en otras partes de la aplicación
