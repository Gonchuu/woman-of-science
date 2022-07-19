import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


//URL local de la BBDD en mongoose y su nombre
const CONECT = process.env.DB_URL || "mongodb://localhost:27017/Women-of-science";
console.log(CONECT);
const connectDb = async () => {

try {

    const db = await mongoose.connect(CONECT, { useNewUrlParser: true, useUnifiedTopology: true })

    const { name, host } = db.connection

    console.log(`Connected with db name: ${name} in host: ${host}`)

} catch (error) {

    console.error('Error to connect with db', error);

}

}



export { connectDb }

// Función que conecta nuestro servidor a la BD de MongoDB por mongoose
// const connection = mongoose.connect(CONECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// export { CONECT, connection };


