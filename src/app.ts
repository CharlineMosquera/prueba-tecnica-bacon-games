import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authMiddleware from "./middlewares/authMiddleware";
import pokemonRoutes from "./routes/pokemonRoutes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./utils/swagger-config";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.disable("x-powered-by"); // Deshabilitar la cabecera X-Powered-By

// Habilitar CORS
app.use(
    cors({
        origin: "*", // Se permite cualquier origen para facilitar el uso de la api en desarrollo
        methods: ["GET", "POST"], // Solo permitir ciertos métodos HTTP
    })
);

// Leer cuerpos de solicitudes en formato JSON
app.use(express.json());
// Cargar las cookies en la solicitud
app.use(cookieParser());

// Rutas
app.use("/api/auth", userRoutes);
app.use("/api/pokemon", authMiddleware, pokemonRoutes);

// Ruta para la documentacion de la Api con Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
