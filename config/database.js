import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// URL local de nuestra base de datos en mongoose y su nombre Dinosaurios
const MONGODB = process.env.MONGODB;

// Función que conecta nuestro servidor a la base de datos de MongoDB mediante mongoose
const connection = mongoose.connect(MONGODB, {
useNewUrlParser: true,
useUnifiedTopology: true,
});