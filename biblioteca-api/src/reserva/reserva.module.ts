import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaController } from './entities/reserva.controller';
import { ReservaService } from './entities/reserva.service';
import { Reserva } from './entities/reserva.entity';
import { LibroModule } from '../libro/libro.module'; 
import { UsuarioModule } from '../usuario/usuario.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]), // Registra la entidad Reserva para TypeORM
    LibroModule, // Importa el módulo de libros para gestionar las relaciones entre libros y reservas
    UsuarioModule, // Importa el módulo de usuarios para gestionar las relaciones entre usuarios y reservas
  ],
  controllers: [ReservaController], // Controlador para manejar las peticiones relacionadas con reservas
  providers: [ReservaService], // Servicio para la lógica de negocio relacionada con reservas
})
export class ReservaModule {}
