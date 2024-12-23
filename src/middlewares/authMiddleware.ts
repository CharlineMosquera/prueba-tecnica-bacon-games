import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import { IAuthenticatedRequest, IUserPayload } from "../interfaces/authenticatedRequest";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Middleware para autenticar las rutas
const authMiddleware = async (req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Verificar si existe el token en las cookies
    const token = req.cookies.tokenjwt;
    if (!token) {
        res.status(403).json({
            message: 'Se requiere token de autenticación'
        });
        return;
    }

    try {
        // Verificar el token, que contenga, el id del usuario y la clave secreta y que no haya expirado
        const decoded = jwt.verify(token, JWT_SECRET) as IUserPayload;
        // Buscar el usuario en la base de datos
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Guardar el usuario en la request
        req.user = { id: user._id.toString() };
        // Continuar
        next();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(401).json({ message: 'Token inválido', error: errorMessage });
        return;
    }
};

export default authMiddleware;
