# Prueba Tecnica Backend en Bacon Games

Backend para el registro, autenticacion y gestion de inventario de pokemon de un usuario.  
Se desarrollo una API Rest con las siguientes funcionalidades:
+ Registro de usuario
+ Login de usuario
+ Añadir un pokemon al usuario (ruta protegida)
+ Obtener el inventario de pokemon del usuario (ruta protegida)
+ Logout del usuario

___

### Decisiones Técnicas

+ Node.js: Entorno de ejecución para JavaScript y TypeScript en el servidor que permite construir aplicaciones escalables y de alto rendimiento.

+ Express: Facilita la creación de rutas, middleware y manejo de solicitudes HTTP.

+ MongoDB: Base de datos NoSQL para almacenar diferentes tipos de datos en un formato flexible y escalable.

+ Mongoose: Para modelar los datos de la aplicación. Facilita la validación, el casting y la creación de relaciones entre documentos.

+ JWT: Para la creación de tokens de acceso que permiten la autenticación y autorización de usuarios de manera segura.

+ bcrypt: Para el hash de contraseñas que proporciona una manera segura de almacenar contraseñas en la base de datos.

+ PokeAPI: API pública que proporciona información detallada sobre Pokémon. 

+ Swagger: Para la documentación de APIs que permite generar documentación interactiva y fácil de usar.

___

### Arquitectura MVC en el Proyecto
#### Modelo (Model)
Los modelos representan la estructura de los datos y las reglas de negocio. En este proyecto, los modelos están definidos utilizando Mongoose.
+ user.ts: Define el esquema y modelo de usuario.
+ pokemon.ts: Define el esquema y modelo de Pokémon.

#### Controlador (Controller)
Los controladores manejan la lógica de negocio y las interacciones con la base de datos. Se encargan de procesar las solicitudes del cliente, interactuar con los modelos y devolver las respuestas adecuadas.
+ authController.ts: Maneja el registro, inicio de sesión y cierre de sesión de los usuarios.
+ pokemonController.ts: Maneja la adición de Pokémon al inventario del usuario y la obtención del inventario.

____

#### Routes
Las rutas definen los endpoints de la API y mapean las solicitudes HTTP a los controladores correspondientes.
+ userRoutes.ts: Define las rutas relacionadas con la autenticación de usuarios.
+ pokemonRoutes.ts: Define las rutas relacionadas con la gestión de Pokémon.

#### Interfaces
Contiene las interfaces TypeScript utilizadas en el proyecto.
+ authenticatedRequest.ts: Define la interfaz para las solicitudes autenticadas.
+ IUser.ts: Define la interfaz para el modelo de usuario.
+ IPokemon.ts: Define la interfaz para el modelo de pokemon.

#### Services
Contiene los servicios que encapsulan la lógica para interactuar con APIs externas.
+ pokeApi.ts: Servicio para obtener datos de Pokémon desde la PokeAPI.

#### Middlewares
+ authMiddleware.ts: Middleware de autenticación que verifica el token JWT y añade la información del usuario a la solicitud.

### Justificación de la Arquitectura
+ Modularidad: La estructura modular facilita el mantenimiento y la escalabilidad del proyecto. Cada componente tiene una responsabilidad clara y definida.
+ Separación de Preocupaciones: La lógica de negocio, las rutas, los modelos y los servicios están separados, lo que mejora la organización del código y facilita la colaboración en equipo.
+ Reutilización de Código: Los servicios y middleware pueden ser reutilizados en diferentes partes de la aplicación, lo que reduce la duplicación de código.
+ Escalabilidad: La arquitectura permite añadir nuevas funcionalidades y módulos sin afectar significativamente el resto del sistema.
+ Seguridad: El uso de JWT para la autenticación y bcrypt para el hash de contraseñas asegura que los datos de los usuarios estén protegidos.

___

### Como utilizar el proyecto

Clonar el repositorio
````bash
git clone https://github.com/CharlineMosquera/prueba-tecnica-bacon-games.git
````
Accder a la carpeta del proyecto
````bash
cd prueba-tecnica-bacon-games/
````

**IMPORTANTE**  
***En la carpeta raiz debe crear un archivo .env y configurar las variables de entorno como se muestra en el archivo de ejemplo .env.example***

Instalar las dependencias configuradas en el package.json:
````bash
npm install
````

Compilar el codigo TS a JS:
````bash
npm run build
````

Levantar el proyecto con nodemon (para desarrollo):
````bash
npm run dev
````
o

Levantar el proyecto en producción:
````bash
npm run start
````
Se espara un mensaje como este por consola:
````bash
Servidor corriendo en el puerto http://localhost:5000
Documentación en http://localhost:5000/api-docs
MongoDB Atlas connected!
````
*En la ruta de la documentación va a encontrar la informacion sobre como utilizar la API y los ejemplos de uso.*
