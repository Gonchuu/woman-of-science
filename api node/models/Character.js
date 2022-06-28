// importo mongoose con ES6
import mongoose from "mongoose";

//creo un esquema de personajes con los campos
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    birth: { type: Number },
    title: { type: String, required: true },
    picture: { type: String},
  },
  {
//Guarda las fechas de creación y actualización de los documentos
    timestamps: true,
  }
);

// Creamos y exportamos el modelo Character
const Character = mongoose.model('Character', characterSchema);

//Exporto con ES6
export { Character }