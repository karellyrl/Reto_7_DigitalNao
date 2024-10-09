import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Debe ser una clave segura
      signOptions: { expiresIn: '1h' }, // Duración del token
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard], // Exporta el guard para usarlo en otros módulos
})
export class AuthModule {}
