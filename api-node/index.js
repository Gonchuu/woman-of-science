import express from "express";
import { connection } from './utils/db.js';

import { Character } from './models/Character.js';

//SERVER
const PORT = process.env.PORT || 3000;
const server = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});


router.get("/characters", async (req, res) => {
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


router.get('/characters', async (req, res) => {
	try {
		const characters = await Character.find();
		return res.status(200).json(characters)
	} catch (err) {
		return res.status(500).json(err);
	}
});


router.get('/characters/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const character = await Character.findById(id);
		if (character) {
			return res.status(200).json(character);
		} else {
			return res.status(404).json('No character found by this id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});


router.get('/characters/name/:name', async (req, res) => {
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

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });