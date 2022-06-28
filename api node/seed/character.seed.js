
// Fichero character.seed.js
import mongoose from 'mongoose';

// Importo el modelo de Character creado
import { Character } from "../models/Character.js";

const characterList = [
  {
    name: 'Marie Curie',
    birth: 1867,
    title: 'Física y Química',
  },
  {
    name: 'Lillian Gilbreth',
    birth: 1878,
    title: 'Psicóloga e Ingeniera Industrial',
  },
  {
    name: 'Edith Clarke',
    birth: 1883,
    title: 'Ingeniera Eléctrica',
  },
  {
    name: 'Gerty Cori',
    birth: 1896,
    title: 'Bioquímica',
  },
  {
    name: 'Annie Easley',
    birth: 1933,
    title: 'Programadora Informática, Matemática y Científica Espacial',
  },
  {
    name: 'Jane Goodall',
    birth:1934,
    title: 'Primatóloga, Etóloga y Antropóloga',
  },
];

//Uso map para crear un new Character a cada objeto del array CharacterList
const characterListDocuments = characterList.map(character => new Character(character));

// nos conectamos a la base de datos
mongoose
  .connect('mongodb://localhost:27017/nodeproyect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
// Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allCharacters = await Character.find();
		
// Si existen personajes previamente, dropearemos la colección
    if (allCharacters.length) {
      await Character.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
// Una vez vaciada la db de los personajes, usaremos el array characterDocuments
// para llenar nuestra base de datos con todas los personajes.
		await Character.insertMany(characterListDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());
