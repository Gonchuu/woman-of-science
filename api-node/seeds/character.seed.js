// Fichero character.seed.js
import mongoose from "mongoose";

// Importo el modelo de Character creado
import { Character } from "../models/Character.js";

const characterList = [
  {
    name: "Marie Curie",
    birth: 1867,
    title: "Física y Química",
    image: "./public/uploads/IMG_9068.jpg",
    phrase: "Me enseñaron que el camino del progreso no es ni rapido ni facil.",
    discoveries:
    "-Primera mujer que obtuvo un doctorado en Francia-Pionera en la investigacion sobre la radioactividad- Fundó el instituto Curie en París-Ganó dos Premios Nobel-Descubrio dos elementos, Polonio y Radio",
  },
  {
    name: "Lillian Gilbreth",
    birth: 1878,
    title: "Psicóloga e Ingeniera Industrial",
    image: "",
    phrase:
    "Considerábamos nuestro tiempo demasiado valioso como para despreciarlo a las tareas del hogar. Éramos ejecutivas",
    discoveries:
    "-Pionera en Ergonometría, en sus estudios de tiempo y movimientos y en psicología organizacional-Primera mujer que formó parte de la sociedad estadounidense de ingenieros mecánicos-Reinventó el espacio de la cocina",
  },
  {
    name: "Edith Clarke",
    birth: 1883,
    title: "Ingeniera Eléctrica",
    image: "",
    phrase:
    "No hay demanda de ingenieras eléctricas  como la hay de doctoras, pero siempra hay demanda de alguien que sepa hacer un buen trabajo",
    discoveries:
    "-inventó una calculadora gráfica para ayudar a resolver ecuaciones que contenian funciones hiperbólicas-creó algunos de los primeros softwares para ingeniería eléctrica-experta en circuitos equivalentes y en análisis gráfico-primera mujer ingeniera eléctrica",
  },
  {
    name: "Gerty Cori",
    birth: 1896,
    title: "Bioquímica",
    image: "",
    phrase:
    "como investigadora, los momentos inolvidables de mi vida son excepcionales...cuando el velo que esconde los secretos de la naturaleza de repente se levanta",
    discoveries:
    "-su trabajo nos ha hecho entender el metabolismo de los carbohidratos- fue una de las descubridoras del ciclo de cori-ganó un Premio Nobel en fisiología o medicina",
  },
  {
    name: "Annie Easley",
    birth: 1933,
    title: "Programadora Informática, Matemática y Científica Espacial",
    image: "",
    phrase:
    "Nada se les ha regalado ni a las minorías ni a las mujeres, ha sido necesario luchar para obtener las mismas oportunidades y seguimos luchando hoy en dia",
    discoveries:
    "-Llevó a cabo importantes investigaciones sobre energías alternativas-ayudó a crear el software para el cohete centauro-fue coautora de muchos artículos sobre cohetes impulsados por energía nuclear y sobre centrales nucleares.",
  },
  {
    name: "Jane Goodall",
    birth: 1934,
    title: "Primatóloga, Etóloga y Antropóloga",
    image: "",
    phrase:
    "Sólo cuando nuestro inteligente cerebro y nuestro corazón humano trabajan juntos, podemos alcanzar nuestro mayor potencial.",
    discoveries:
    "-la mayor experta de mundo en chimpancés-descubrió que los primates fabrican herramientas-activista de los derechos de los animales y de la conservación de la vida salvaje",
  },
];

//Uso map para crear un new Character a cada objeto del array CharacterList
const characterListDocuments = characterList.map(
    (character) => new Character(character)
);

// nos conectamos a la base de datos
mongoose
    .connect("mongodb://localhost:27017/Women-of-science", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allCharacters = await Character.find();

    // Si existen personajes previamente, dropearemos la colección
    if (allCharacters.length > 0) {
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
  .finally(() => { 
    mongoose.disconnect();
    console.log('OK!');
  });
