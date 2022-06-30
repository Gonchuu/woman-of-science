import express from "express";
import { connection } from './utils/db.js';

import { Character } from './models/Character.js';
import { characterRoutes } from './routes/character.routes.js';

//SERVER
const PORT = process.env.PORT || 3000;
const server = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);

//Routes
server.use('/characters', characterRoutes);

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
