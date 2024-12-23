import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

// Definición del esquema para Mongo
const userSchema = new Schema<IUser>({
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique: true}, // Solo puede existir un usuario con el mismo correo
    password:{ type: String, required:true},
    pokemons: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }] // Referencia al modelo de Pokemons
});

const UserModel = model<IUser>("User", userSchema)

export default UserModel;