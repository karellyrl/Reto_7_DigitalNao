import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { LibroModule } from './libro/libro.module'; 
import { UsuarioModule } from './usuario/usuario.module'; 
import { AuthModule } from './auth/auth.module'; 
import { ReservaModule } from './reserva/reserva.module';
import { ReseñaModule } from './reseña/reseña.module'; 
import * as dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

@Module({
  imports: [
    // Configuración del TypeORM con MySQL
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: process.env.DB_HOST, 
      port: +process.env.DB_PORT, 
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME, 
      entities: [
        __dirname + '/libro/entities/*.entity{.ts,.js}', // Entidades de libros
        __dirname + '/usuario/entities/*.entity{.ts,.js}', // Entidades de usuarios
        __dirname + '/reserva/entities/*.entity{.ts,.js}', // Entidades de reservas
        __dirname + '/reseña/entities/*.entity{.ts,.js}', // Entidades de reseñas
      ],
      autoLoadEntities: true, // Carga automáticamente las entidades registradas
      synchronize: true, // Sincroniza automáticamente las entidades con la base de datos 
    }),
    LibroModule, 
    UsuarioModule, 
    AuthModule, 
    ReservaModule, 
    ReseñaModule, 
  ],
})
export class AppModule {}
