import { model, Schema } from "mongoose";
import { IPokemon } from "../interfaces/IPokemon";

// Definición del esquema para Mongo
const pokemonSchema = new Schema<IPokemon>({
    name: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true } // Schema.Types.Mixed para almacenar cualquier tipo de datos
});

const PokemonModel = model<IPokemon>("Pokemon", pokemonSchema);

export default PokemonModel;