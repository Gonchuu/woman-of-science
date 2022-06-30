// Archivo Character.js dentro de la carpeta models
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    birth: { type: Number },
    title: { type: String, required: true },
    phrase: { type: String},
    discoveries: { type: String},
  },
  {
    // Esta propiedad servirá para guardar las fechas de creación y actualización de los documentos
    timestamps: true,
  }
);

// Creamos y exportamos el modelo Character
const Character = mongoose.model('Character', characterSchema);
export { Character }
