import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { UsuarioService } from './entities/usuario.service';
import { UsuarioController } from './entities/usuario.controller';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),  
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule], // Asegúrate de exportar TypeOrmModule también
})
export class UsuarioModule {}
