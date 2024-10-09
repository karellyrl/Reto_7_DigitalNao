import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseñaController } from './entities/reseña.controller';
import { ReseñaService } from './entities/reseña.service';
import { Resena } from './entities/reseña.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resena, Usuario])],
  controllers: [ReseñaController],
  providers: [ReseñaService],
})
export class ReseñaModule {}
