import { Request } from "express";

// Interfaz para el payload del usuario autenticado
export interface IUserPayload {
    id: string;
}

// Interfaz para la request autenticada
export interface IAuthenticatedRequest extends Request {
    user?: IUserPayload;
}
