import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Crear la aplicación de NestJS
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde otros dominios
  app.enableCors({
    origin: '*', // Permitir todas las orígenes, puedes restringirlo a un dominio específico en producción
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos en las solicitudes
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos en las solicitudes
  });

  // Configuración de Swagger para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('Biblioteca API') // Título del documento Swagger
    .setDescription('API para gestionar libros, usuarios, reseñas y reservas') // Descripción del API
    .setVersion('1.0') // Versión de la API
    .addTag('Libros') // Categoría para operaciones relacionadas con libros
    .addTag('Usuarios') // Categoría para operaciones relacionadas con usuarios
    .addTag('Reseñas') // Categoría para operaciones relacionadas con reseñas
    .addTag('Reservas') // Categoría para operaciones relacionadas con reservas
    .addTag('Login') // Categoría para operaciones relacionadas con el login
    .addBearerAuth() // Esquema de autenticación Bearer JWT para proteger las rutas
    .addServer('https://reto-7-digitalnao.onrender.com') // URL del servidor en producción, puede cambiar según el despliegue
    .build();

  // Crear el documento Swagger a partir de la configuración anterior
  const document = SwaggerModule.createDocument(app, config);

  // Configurar Swagger en la ruta /api para que sea accesible desde esa URL
  SwaggerModule.setup('api', app, document);

  // Configuración del puerto, usando la variable de entorno PORT o el puerto 3000 por defecto
  const port = process.env.PORT || 3000;
  
  // Iniciar la aplicación en el puerto configurado
  await app.listen(port);
}

bootstrap();
