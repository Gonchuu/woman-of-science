import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connection } from '../api-node/utils/db.js';
import { Character } from './models/Character.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { DB_URL } from './utils/db.js';

import { userRoutes } from "./routes/user.routes.js";
import { characterRoutes } from './routes/character.routes.js';
import { cityRoutes } from "./routes/city.routes.js";

//SERVER
const PORT = process.env.PORT || 3000;
const server = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

//JWT
server.set("secretKey", "nodeRestApi");


//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
server.use(express.static(path.join(__dirname, 'public')));


//Routes
server.use('/users', userRoutes);
server.use('/characters', characterRoutes);
server.use('/cities', cityRoutes);

//Control de errores//se crea un error para cuando no encuentre la ruta
server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error); // Lanzamos la función next() con un error
});
//control de errores
server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || "Unexpected error");
});

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });
