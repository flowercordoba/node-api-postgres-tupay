# Tupay API

## Descripción

Tupay API es una plataforma backend que permite la gestión de usuarios, transacciones, proveedores y notificaciones. La API está documentada utilizando **Swagger** y utiliza **JWT** para la autenticación de usuarios. Además, permite el proceso de `payin` y `payout`, gestionando transacciones con proveedores externos mediante webhooks.

## Tecnologías utilizadas

- **Node.js**: Plataforma utilizada para desarrollar la API.
- **Express.js**: Framework utilizado para manejar las rutas y controladores de la API.
- **PostgreSQL**: Base de datos relacional utilizada para almacenar usuarios, transacciones y otros datos.
- **Sequelize**: ORM (Object-Relational Mapping) utilizado para interactuar con la base de datos PostgreSQL.
- **JWT (JSON Web Tokens)**: Utilizado para la autenticación de usuarios y protección de rutas.
- **Swagger**: Utilizado para la documentación de la API.
- **pgAdmin**: Herramienta para gestionar la base de datos.
- **@faker-js/faker**: Utilizado para generar datos ficticios en los seeders.

## Requisitos

- **Node.js** v14 o superior.
- **PostgreSQL** v12 o superior.
- **pgAdmin** (opcional, pero recomendado para la gestión de la base de datos).
- **Git** para la clonación del repositorio.

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/node-api-postgres-tupay.git
   ```

2. **Instala las dependencias:**

   ```bash
   cd node-api-postgres-tupay
   npm install
   ```

3. **Configura la base de datos:**

   - Renombra el archivo `src/config/config.example.json` a `config.json`:

     ```bash
     mv src/config/config.example.json src/config/config.json
     ```

   - Edita `src/config/config.json` con tus credenciales de base de datos:

     ```json
     {
       "development": {
         "username": "tu_usuario",
         "password": "tu_contraseña",
         "database": "tupay_db",
         "host": "127.0.0.1",
         "dialect": "postgres"
       }
     }
     ```

4. **Ejecuta las migraciones de base de datos:**

   ```bash
   npx sequelize-cli db:migrate --config src/config/config.json
   ```

5. **(Opcional) Poblar la base de datos con datos de ejemplo:**

   ```bash
   npm run seeder
   ```

## Ejecución

- **En modo desarrollo:**

  ```bash
  npm run dev
  ```

- **En modo producción:**

  ```bash
  npm start
  ```

La aplicación estará disponible en `http://localhost:3000`.

## Autenticación y Seguridad

- Se utiliza **JWT** para la autenticación de usuarios.
- Al registrarse o iniciar sesión, se devuelve un token que debe ser enviado en los headers de las solicitudes protegidas:

  ```
  Authorization: Bearer <token>
  ```

## Documentación de la API

La documentación de la API está disponible mediante Swagger.

- Accede a `http://localhost:3000/api-docs` para ver la documentación interactiva.

## Estructura de la API

### Rutas principales

- **Autenticación:**
  - `POST /auth/register`: Registro de nuevos usuarios.
  - `POST /auth/login`: Inicio de sesión y obtención de token JWT.

- **Transacciones:**
  - `GET /transactions`: Obtener lista de transacciones (requiere autenticación).
  - `POST /payin/choose-provider`: Realizar una transacción de ingreso (`payin`).
  - `POST /payout/choose-provider`: Realizar una transacción de egreso (`payout`).

- **Proveedores:**
  - `GET /payin/providers`: Listar proveedores disponibles para `payin`.
  - `GET /payout/providers`: Listar proveedores disponibles para `payout`.

- **Webhooks:**
  - `POST /payin/webhook/payment-notification`: Endpoint para recibir notificaciones de proveedores sobre pagos completados.

## Migraciones y Seeders

### Migraciones

Para aplicar migraciones:

```bash
npx sequelize-cli db:migrate --config src/config/config.json
```

### Seeders

Para poblar la base de datos con datos de prueba:

```bash
npm run seeder
```

## Respaldo de Base de Datos

Para realizar un respaldo de la base de datos utilizando pgAdmin:

1. **Abre pgAdmin y selecciona la base de datos.**
2. **Haz clic derecho y selecciona "Backup...".**
3. **Configura las opciones y guarda el respaldo en tu sistema.**

O usando la línea de comandos:

```bash
pg_dump -U tu_usuario -W -F c -b -v -f "tupay_db.backup" tupay_db
```

## Restaurar Base de Datos

Para restaurar la base de datos desde un respaldo:

```bash
pg_restore -U tu_usuario -W -d tupay_db -v "tupay_db.backup"
```

## Contribuciones

Si deseas contribuir a este proyecto:

1. **Haz un fork del repositorio.**
2. **Crea una rama para tu nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`).**
3. **Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).**
4. **Haz push a la rama (`git push origin feature/nueva-funcionalidad`).**
5. **Abre un Pull Request en GitHub.**

## Licencia

Este proyecto está bajo la Licencia MIT.
