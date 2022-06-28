//Traigo y configuro express y el router
import express from "express";
import { upload, uploadToCloudinary } from "../middleware/file.middleware.js";

//import fs from "fs";
//traigo el modelo de character creado en la carpeta models
import { Character } from "../models/Character.js";

//import imageToUri from "image-to-uri";
//importo el middleware de upload


const router = express.Router();

//Agrupo las router de index.js
//Endpoint de characters
//se crea un error para cuando no encuentre la ruta
///Quito los prefijos character de los router.get porque ya están gestionados con la configuración de characterRoutes
//GET
router.get("/", async (req, res) => {
  const { minBirth = 1700, maxBirth = 2000 } = req.query;

  //Condición para fecha nac. mínima y máxima
  if (minBirth || maxBirth) {
    try {
      const characterByAge = await Character.find({
        birth: { $gt: minBirth, $lt: maxBirth },
      });
      return res.status(200).json(characterByAge);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    try {
      const characters = await Character.find();
      return res.status(200).json(characters);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

//POST
router.post("/", [upload.single("picture"), uploadToCloudinary], async (req, res, next) => {
  try {
    const characterPicture = req.file_url || null;
    // Crearemos una instancia de character con los datos enviados
    const newCharacter = new Character({
      name: req.body.name,
      birth: req.body.birth,
      title: req.body.title,
      //picture: imageToUri(characterPicture),
      picture: characterPicture
    });

    // Guardamos el personaje en la DB
    const createdCharacter = await newCharacter.save();
    //await fs.unlinkSync(characterPicture);

    return res.status(201).json(createdCharacter);
  } catch (error) {
    // Lanzamos la función next con el error para que lo gestione Express
    next(error);
  }
});

//Endpoint de characters con su id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const character = await Character.findById(id);
    if (character) {
      return res.status(200).json(character);
    } else {
      return res.status(404).json("No character found by this id");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Character.findByIdAndDelete(id);
    return res.status(200).json("Character deleted!");
  } catch (error) {
    return next(error);
  }
});

//PUT
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const characterModify = new Character(req.body);
        characterModify._id = id;
        const characterUpdated = await Character.findByIdAndUpdate(id , characterModify)
        return res.status(200).json(characterUpdated);
    } catch (error) {
        return next(error);
    }
});

//Endpoint de characters con su title
router.get("/title/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const characterByTitle = await Character.find({ title: title });
    //Creo ERROR si no existe el título
    if (characterByTitle.length > 0) {
      return res.status(200).json(characterByTitle);
    } else {
      return res.status(404).json("No character found by this title");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

export { router as characterRoutes };
