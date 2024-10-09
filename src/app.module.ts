import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroModule } from './libro/libro.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module'; // Asegúrate de importar el módulo de autenticación
import { ReservaModule } from './reserva/reserva.module'; // Importa el módulo de reservas
import { ReseñaModule } from './reseña/reseña.module'; // Importa el módulo de reseñas

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Rivera315.',
      database: 'biblioteca',
      entities: [
        __dirname + '/libro/entities/*.entity{.ts,.js}',
        __dirname + '/usuario/entities/*.entity{.ts,.js}',
        __dirname + '/reserva/entities/*.entity{.ts,.js}', // Agrega la ruta para las entidades de reserva
        __dirname + '/reseña/entities/*.entity{.ts,.js}', // Agrega la ruta para las entidades de reseña
      ],
      autoLoadEntities: true,
      synchronize: true, // No usar en producción
    }),
    LibroModule,
    UsuarioModule,
    AuthModule, // Asegúrate de que el módulo de autenticación esté aquí
    ReservaModule, // Agrega el módulo de reservas
    ReseñaModule, // Agrega el módulo de reseñas
  ],
})
export class AppModule {}
