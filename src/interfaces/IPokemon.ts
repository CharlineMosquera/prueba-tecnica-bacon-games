import { Document, Types } from "mongoose";

// Interface para el tipado de los Pokémons
export interface IPokemon extends Document {
    _id: Types.ObjectId;
    name: string; // Nombre del Pokémon
    data: any; // Respuesta de la API de Pokémon
}