import axios from "axios";

// Función para obtener los datos de un Pokémon
export const getPokemonData = async (pokemonName: string) => {
    try {
        // Hacer una petición a la pokeApi
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos del Pokémon", error);
        return null;
    }
};