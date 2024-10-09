import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { LibroService } from './entities/libro.service';  
import { LibroController } from './entities/libro.controller'; 
import { Libro } from './entities/libro.entity'; // Asegúrate de que esta ruta sea correcta

@Module({
  imports: [TypeOrmModule.forFeature([Libro])], // Añade el Libro aquí
  controllers: [LibroController],
  providers: [LibroService],
  exports: [TypeOrmModule], // Exporta TypeOrmModule para que otros módulos lo usen
})
export class LibroModule {}
