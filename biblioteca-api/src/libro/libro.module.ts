import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { LibroService } from './entities/libro.service'; 
import { LibroController } from './entities/libro.controller';
import { Libro } from './entities/libro.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Libro]) 
  ],
  controllers: [LibroController], // Define el controlador asociado a este módulo
  providers: [LibroService], // Define el servicio asociado a este módulo
  exports: [TypeOrmModule], // Exporta TypeOrmModule para que otros módulos puedan usarlo
})
export class LibroModule {} 
