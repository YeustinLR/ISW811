# API RESTful para Gestión de Usuarios y Autenticación con Twitter

## Descripción

Esta es una API RESTful desarrollada con Node.js, Express y MySQL. La API permite la gestión de usuarios y la autenticación a través de Twitter, así como la publicación de tweets. Está diseñada para proporcionar una interfaz clara y segura para manejar usuarios, autenticar sesiones, y conectar con la API de Twitter.

## Características

- **Registro de Usuario**: Permite el registro de nuevos usuarios con validación de datos.
- **Inicio de Sesión**: Autenticación de usuarios con soporte para autenticación de dos factores (2FA).
- **Gestión de Usuarios**: Consultas para obtener todos los usuarios o detalles de un usuario específico.
- **Autenticación con Twitter**: Inicio de sesión con Twitter y publicación de tweets.
- **Autenticación y Autorización**: Protege las rutas con JWT para asegurar el acceso a los recursos.

## Requisitos

- Node.js (>= 14.x)
- MySQL (>= 5.7)
- Twitter API Credentials (Consumer Key y Consumer Secret)

## Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
Instala las dependencias

2. **Navega al directorio del proyecto e instala las dependencias usando npm:**

- bash
- Copiar código
- cd tu-repo
- npm install
- Configura el entorno

3. **Crea un archivo .env en la raíz del proyecto con el siguiente contenido:**

- env
- Copiar código
- DB_HOST=localhost
- DB_USER=tu_usuario_db
- DB_PASSWORD=tu_contraseña_db
- DB_DATABASE=nombre_base_datos
- SESSION_SECRET=tu_clave_secreta_sesion
- JWT_SECRET=tu_clave_secreta_jwt
- JWT_SECRET_TEMP=tu_clave_secreta_temp
- TWITTER_CONSUMER_KEY=tu_clave_consumidor_twitter
- TWITTER_CONSUMER_SECRET=tu_secreto_consumidor_twitter
- PORT=5000
- SERVER_HOST=localhost

4. **Inicia la base de datos.**
Asegúrate de tener MySQL corriendo y crea las tablas necesarias en la base de datos. Consulta los scripts de la base de datos en el directorio /database para detalles.

5. **Inicia la base de datos.**

## Endpoints

### Usuarios

- **Registro de Usuario**
  - `POST /api/users/register`
  - **Requiere:** `nombre`, `apellido`, `email`, `password`
  
- **Inicio de Sesión**
  - `POST /api/users/login`
  - **Requiere:** `email`, `password`
  
- **Obtener Todos los Usuarios**
  - `GET /api/users/getall`
  
- **Obtener Usuario por ID**
  - `GET /api/users/get/:id`
  
- **Perfil de Usuario (Protegido)**
  - `GET /api/users/profile`
  - **Requiere autenticación**
  
- **Generar QR para 2FA (Protegido)**
  - `GET /api/users/2fa/setup`
  - **Requiere autenticación**
  
- **Verificar Código OTP para 2FA (Protegido)**
  - `POST /api/users/2fa/verify`
  - **Requiere autenticación**

### Twitter

- **Autenticación con Twitter**
  - `GET /auth/twitter`
  
- **Callback de Twitter**
  - `GET /auth/twitter/callback`
  
- **Publicar Tweet (Protegido)**
  - `POST /auth/tweet`
  - **Requiere autenticación**
  
- **Guardar Tokens de Twitter (Protegido)**
  - `POST /auth/save-tokens`
  - **Requiere autenticación**

## Middleware

- **`validateRequest`**: Valida los datos de entrada usando `express-validator`.
- **`authenticateToken`**: Verifica los tokens JWT para acceso a rutas protegidas.
- **`authenticateTokenTemp`**: Verifica tokens temporales para autenticación de 2FA.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un `issue` o envía un `pull request` para colaborar en el proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT -