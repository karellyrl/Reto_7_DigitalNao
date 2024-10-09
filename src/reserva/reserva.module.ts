import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaController } from './entities/reserva.controller';
import { ReservaService } from './entities/reserva.service';
import { Reserva } from './entities/reserva.entity';
import { LibroModule } from '../libro/libro.module'; // Importa el LibroModule
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    LibroModule, // Asegúrate de incluirlo aquí
    UsuarioModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
