import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // Permitir todas las orígenes, puedes restringirlo a un dominio específico
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Biblioteca API')
    .setDescription('API para gestionar libros, usuarios, reseñas y reservas')
    .setVersion('1.0')
    .addTag('Libros')
    .addTag('Usuarios')
    .addTag('Reseñas')
    .addTag('Reservas')
    .addTag('Login')
    .addBearerAuth() // Añadir esquema de autenticación Bearer JWT
    .addServer('https://reto-7-digitalnao.onrender.com') // Cambiar esto a la URL de producción
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Cambiar esta línea para usar la variable de entorno PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
