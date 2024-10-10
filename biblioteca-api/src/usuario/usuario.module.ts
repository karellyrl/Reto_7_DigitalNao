import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UsuarioService } from './entities/usuario.service'; 
import { UsuarioController } from './entities/usuario.controller'; 
import { Usuario } from './entities/usuario.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),  // Registra la entidad Usuario 
  ],
  controllers: [UsuarioController], // Define el controlador que manejara las peticiones relacionadas con usuarios
  providers: [UsuarioService], // Proporciona el servicio 
  exports: [UsuarioService, TypeOrmModule], // Exporta el servicio de usuario y el módulo TypeORM 
})
export class UsuarioModule {}
