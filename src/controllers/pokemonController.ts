import { Request, Response } from "express";
import UserModel from "../models/user";
import PokemonModel from "../models/pokemon";
import { getPokemonData } from "../services/pokeApi";
import { IAuthenticatedRequest } from "../interfaces/authenticatedRequest";

// Añade un nuevo pokemon al usuario que esta autenticado
export const addPokemon = async (req: Request, res: Response): Promise<void> => {
    const { user } = req as IAuthenticatedRequest;
    const { pokemonName } = req.body;

    // Busca si el usuario esta autenticado
    if (!user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
    }

    try {
        // Traer la data del pokemon desde la pokeApi
        const pokemonData = await getPokemonData(pokemonName);
        if (!pokemonData) {
            res.status(404).json({ message: "Pokémon no encontrado" });
            return;
        }

        // Crea el objeto del pokemon
        const newPokemon = new PokemonModel({
            name: pokemonData.name,
            data: pokemonData
        });

        // Guardar el pokemon en la base de datos
        await newPokemon.save();

        // Buscar el usuario en la base de datos
        const userRecord = await UserModel.findById(user.id);
        if (!userRecord) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Agregar el pokemon al inventario del usuario
        userRecord.pokemons.push(newPokemon._id);
        await userRecord.save();
        res.status(200).json({ message: "Pokémon agregado exitosamente", pokemon: pokemonData.name });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: "Error en el servidor", error: errorMessage });
    }
};

// Obtiene el inventario del usuario que esta autenticado
export const getInventory = async (req: Request, res: Response): Promise<void> => {
    const { user } = req as IAuthenticatedRequest;

    // Busca si el usuario esta autenticado
    if (!user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
    }

    try {
        // Buscar los pokemon del usuario en la base de datos
        const userRecord = await UserModel.findById(user.id).populate("pokemons");
        if (!userRecord) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        // Responder con el inventario del usuario
        res.status(200).json({ pokemons: userRecord.pokemons });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: "Error en el servidor", error: errorMessage });
    }
};