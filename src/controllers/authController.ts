import { Request, Response } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Clave secreta para firmar el JWT
const JWT_SECRET = process.env.JWT_SECRET as string;

/* Registra un nuevo usuario */
export const registerUser = async (req: Request, res: Response): Promise<void>  => {
    const { name, email, password } = req.body;
    
    try {
        // Verifica si el usuario ya esta registrado
        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
            res.status(400).json({ message: "El correo ya esta registrado." });
            return;
        }
        // Encripta la contraseña
        const encryptedPassword = await bcrypt.hash(password, 10);
        // Crea el objeto usuario
        const newUser = new UserModel({
            name,
            email,
            password: encryptedPassword,
        });
        // Guarda el usuario en la base de datos
        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });

    } catch(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: "Error al registrar el usuario", error: errorMessage });
    }
};

// Inicio de sesión del usuario
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Verifica que el usuario exista en DB
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Correo no registrado." });
            return;
        }
        // Verifica la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            res.status(400).json({ message: "Contraseña incorrecta" });
            return;
        }
        // Crea el token JWT
        const token = jwt.sign({ id: user._id}, JWT_SECRET, {expiresIn: "1h"});
        res.cookie('tokenjwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
        
    } catch(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: "Error al iniciar sesión", error: errorMessage });
    }
}

// Cierra la sesión e invalida el token
export const logoutUser = (req: Request, res: Response): void => {
    try {
        res.clearCookie('tokenjwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: "Error al cerrar sesión", error: errorMessage });
    }
};