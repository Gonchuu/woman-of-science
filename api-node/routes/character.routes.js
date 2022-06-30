import express from "express";
import { Character } from "../models/Character.js";

const router = express.Router();

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

router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    return res.status(200).json(characters);
  } catch (err) {
    return res.status(500).json(err);
  }
});

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

router.get("/name/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const characterByName = await Character.find({ name: name });
    if (characterByName.length > 0) {
      return res.status(200).json(characterByName);
    } else {
      return res.status(404).json(`No character found by this name: ${name}`);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//POST
router.post("/", async (req, res, next) => {
    try {
    //   const characterPicture = req.file.path ? req.file.path : null;
      // Crearemos una instancia de character con los datos enviados
      const newCharacter = new Character({
        name: req.body.name,
        birth: req.body.birth,
        title: req.body.title,
        phrase: req.body.phrase,
        discoveries: req.body.discoveries,
        // picture: imageToUri(characterPicture),
      });
  
      // Guardamos el personaje en la DB
      const createdCharacter = await newCharacter.save();
    //   await fs.unlinkSync(characterPicture);
  
      return res.status(201).json(createdCharacter);
    } catch (error) {
      // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
  });
  

export { router as characterRoutes };
