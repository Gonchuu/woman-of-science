import mongoose from "mongoose";

//URL local de la BBDD en mongoose y su nombre
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/Women-of-science";

//Función que conecta nuestro servidor a la BD de MongoDB por mongoose
const connection = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export { DB_URL, connection };
