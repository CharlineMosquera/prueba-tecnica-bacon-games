import { Document, Types } from "mongoose";

// Interface para el tipado de los usuarios
export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    pokemons: Types.ObjectId[]; // Para el inventario de Pokémons
}