import express from "express";

import path from "path";
import { fileURLToPath } from "url";
import { DB_URL } from "./utils/db.js";

import dotenv from "dotenv";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { isAuth } from "./authentication/passport.js";

import { userRoutes } from "./routes/user.routes.js";
import { characterRoutes } from "./routes/characer.routes.js";
import { cityRoutes } from "./routes/city.routes.js";


//SERVER
const PORT = process.env.PORT || 3000;
const server = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));

//Passport and Session
server.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 
    },
    store: MongoStore.create({
      mongoUrl: DB_URL,
    })
  })
);
server.use(passport.initialize());
server.use(passport.session());

//UPLOAD FILES
//server.use(express.static(path.join(__dirname, 'public')));

//server.use("/", router); Sustituyo este Middleare por el de characterRoutes, importándolo de /routes/characer.routes.js
//Routes
server.use('/users', userRoutes);
server.use('/characters', [isAuth], characterRoutes);
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
