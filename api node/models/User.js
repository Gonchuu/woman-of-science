//Creo el modelo de usuario
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    //se pueden añadir más campos
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export { User };