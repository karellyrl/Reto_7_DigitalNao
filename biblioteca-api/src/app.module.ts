import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroModule } from './libro/libro.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ReservaModule } from './reserva/reserva.module';
import { ReseñaModule } from './reseña/reseña.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, // Usa la variable de entorno
      port: +process.env.DB_PORT, // Convierte a número
      username: process.env.DB_USERNAME, // Usa la variable de entorno
      password: process.env.DB_PASSWORD, // Usa la variable de entorno
      database: process.env.DB_NAME, // Usa la variable de entorno
      entities: [
        __dirname + '/libro/entities/*.entity{.ts,.js}',
        __dirname + '/usuario/entities/*.entity{.ts,.js}',
        __dirname + '/reserva/entities/*.entity{.ts,.js}',
        __dirname + '/reseña/entities/*.entity{.ts,.js}',
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    LibroModule,
    UsuarioModule,
    AuthModule,
    ReservaModule,
    ReseñaModule,
  ],
})
export class AppModule {}
