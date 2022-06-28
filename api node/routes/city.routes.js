//Traigo y configuro express y el router
import express from "express";
//traigo el modelo de character creado en la carpeta models
import { City } from "../models/City.js";
const router = express.Router();

//GET
router.get('/', async (req, res, next) => {
  try {
      const cities = await City.find().populate('characters');
      return res.status(200).json(cities);
  } catch (error) {
      return next(error);
  }
});

//POST
router.post("/", async (req, res, next) => {
  try {
    const newCity = new City({
        name: req.body.name,
        characters: []
    });
    const createdCity = await newCity.save();
    return res.status(201).json(createdCity);
} catch (error) {
    next(error);
}
});

//DELETE para borrar las ciudadades que tenía repetidas
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    return res.status(200).json("City deleted!");
  } catch (error) {
    return next(error);
  }
});

//PUT para añadir personajes
router.put('/add-character', async (req, res, next) => {
  try {
      const { cityId } = req.body;
      const { characterId } = req.body;
      const updatedCity = await City.findByIdAndUpdate(
          cityId,
          { $push: { characters: characterId } },
          { new: true }
      );
      return res.status(200).json(updatedCity);
  } catch (error) {
      return next(error);
  }
});

export { router as cityRoutes };
