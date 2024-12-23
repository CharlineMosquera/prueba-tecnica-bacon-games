import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentación de la API",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Servidor de desarrollo",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
