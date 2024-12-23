import app from "./app";
import connectDB from "./db/connect";
import dotenv from "dotenv";

// Cargando los secretos
dotenv.config();

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
