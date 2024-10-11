# Reto_7_Digital_Nao
En este reto se encuentra la documentación para ejecutar los códigos de ejemplos implementado en TypeScript y el proyecto de la API RESTful.

# Proyecto TypeScript - Ejemplos de Código

Este proyecto contiene ejemplos de código en TypeScript que ilustran conceptos básicos, tipos de datos y buenas prácticas. A continuación se detallan los pasos para configurar y ejecutar los ejemplos.

## Requisitos Previos

Asegurar de tener instalados los siguientes programas en tu máquina:

1. **Node.js**: [Descargar Node.js](https://nodejs.org/).
2. **TypeScript**: Se instalará junto con Node.js.

## Instalación de TypeScript

Una vez que se tenga instalado Node.js, se abre la terminal y se ejecuta el siguiente comando para instalar TypeScript globalmente:

```bash
npm install -g typescript
```

## Ejecución de los Códigos

1. **Clonar el repositorio. Clonar este repositorio en tu máquina local usando el siguiente comando y cambiar al directorio donde se encuentra la carpeta codigo_ejemplos:**

   ```bash
   git clone https://github.com/karellyrl/Reto_7_DigitalNao
   cd codigo_ejemplos
   ```

2. **Compilar los archivos TypeScript. Se puede compilar todos los archivos TypeScript en la carpeta con el siguiente comando:**

   ```bash
   tsc 
   ```
O, se puede compilar cada archivo individualmente, ejecuta
   ```bash
   tsc colecciones.ts
   tsc enumeraciones.ts
   tsc tipos_datos.ts
   tsc union_interseccion.ts
   tsc any_unknown.ts
   ```
3. **Ejecutar los archivos JavaScript generados. Después de compilar, se ejecuta cada archivo JavaScript resultante con Node.js:**

   ```bash
   node colecciones.js
   node enumeraciones.js
   node tipos_datos.js
   node union_interseccion.js
   node any_unknown.js
   ```

# Biblioteca API
Este proyecto es una API RESTful para la gestión de libros, usuarios, reseñas y reservas en una biblioteca, utilizando Nest.js, TypeORM, JWT para autenticación, y Swagger para la documentación. La API cuenta con un sistema de autenticación basado en JWT y ha sido documentada usando Swagger. La API está desplegada en [Render](https://reto-7-digitalnao.onrender.com/api-json) y puedes explorar su documentación en [Swagger Hub](https://app.swaggerhub.com/apis-docs/KARELLY123RIVERAH/Biblioteca-api/1.0#/).

## Características

- **Operaciones CRUD** para libros, usuarios, reseñas y reservas.
- **Autenticación JWT** para proteger las rutas de acceso.
- **Swagger** para la documentación interactiva de la API.
- **Gestión de reservas**: Evita que un libro reservado sea reservado nuevamente.
- **Gestión de disponibilidad**: Los libros vuelven a estar disponibles tras eliminar una reserva.

## Tecnologías Utilizadas

- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL/MySQL](https://www.postgresql.org/) / (https://www.mysql.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [Swagger](https://swagger.io/)

## Endpoints

### Usuarios

- **POST /usuarios**: Crear un nuevo usuario
- **GET /usuarios**: Obtener la lista de todos los usuarios
- **GET /usuarios/{id}**: Obtener un usuario por su ID
- **PATCH /usuarios/{id}**: Actualizar un usuario por su ID
- **DELETE /usuarios/{id}**: Eliminar un usuario por su ID

### Libros

- **POST /libros**: Crear un nuevo libro
- **GET /libros**: Obtener la lista de todos los libros
- **GET /libros/{id}**: Obtener un libro por su ID
- **GET /libros/buscar**: Buscar libros por título, género y autos
- **PATCH /libros/{id}**: Actualizar un libro por su ID
- **DELETE /libros/{id}**: Eliminar un libro por su ID

### Reservas

- **POST /reservas**: Crear una nueva reserva
- **GET /reservas**: Obtener la lista de todas las reservas
- **GET /reservas/{id}**: Obtener una reserva por su ID
- **GET /reservas/libro/{libroId}**: Obtener la lista de las reservas de un libro
- **PATCH /reservas/{id}**: Actualizar una reserva por su ID
- **DELETE /reservas/{id}**: Eliminar una reserva por su ID

### Reseñas

- **POST /resenas**: Crear una nueva reseña
- **GET /resenas**: Obtener la lista de todas las reseñas
- **GET /resenas/{id}**: Obtener una reseña por su ID
- **GET /resenas/libro/{libroId}**: Obtener la lista de las reseñas de un libro
- **PATCH /resenas/{id}**: Actualizar una reseña por su ID
- **DELETE /resenas/{id}**: Eliminar una reseña por su ID

### Autenticación

- **POST /login**: Iniciar sesión y obtener un token JWT

### Notas:
- Las rutas protegidas requieren un token JWT. Se puede añadir el token en el encabezado `Authorization` con el esquema `Bearer <token>`.
- La funcionalidad de **Swagger** está disponible en `/api` para interactuar con la API.

## Despliegue

- **API en Render**: [https://reto-7-digitalnao.onrender.com/api-json](https://reto-7-digitalnao.onrender.com/api-json)
- **Documentación Swagger en Render**: [https://reto-7-digitalnao.onrender.com/api](https://reto-7-digitalnao.onrender.com/api)
- **API en Swagger Hub**: [https://app.swaggerhub.com/apis-docs/tuusuario/biblioteca-api/1.0](https://app.swaggerhub.com/apis-docs/KARELLY123RIVERAH/Biblioteca-api/1.0#/)

## Instalación del Proyecto

Para ejecutar este proyecto de forma local, se deben seguir los siguientes pasos:

### 1. Clonar el Repositorio

Clonar este repositorio en tu máquina local:

```bash
git clone https://github.com/karellyrl/Reto_7_DigitalNao
cd biblioteca-api
```
### 2. Instalación de Dependencias

Instalar las dependencias del proyecto usando npm:

```bash
npm install
```

### 3. Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
PORT=3000
DB_HOST=sql3.freesqldatabase.com
DB_PORT=3306
DB_USERNAME=sql3736546
DB_PASSWORD=gMHIKn1pDH
DB_DATABASE=sql3736546
JWT_SECRET=tu_secreto_jwt
```

### 4. Ejecución del Proyecto

Iniciar el servidor de desarrollo con el siguiente comando:

```bash
npm run start:dev
```

El proyecto se ejecutará en `http://localhost:3000/`.

### 5. Base de Datos
Se optó por utilizar **Free SQL Database** como sistema de gestión de bases de datos. Esta plataforma permite almacenar y gestionar los datos de manera eficiente, asegurando que las reservas, libros y usuarios se manejen correctamente. La conexión a la base de datos se configura mediante variables de entorno, lo que permite una fácil integración y configuración del entorno de desarrollo.

- **Base de Datos en FreeSQLDatabase**:
  - Host: `sql3.freesqldatabase.com`
  - Puerto: `3306`
  - Usuario: `sql3736546`
  - Contraseña: `gMHIKn1pDH`
  - Nombre de la Base de Datos: `sql3736546`
