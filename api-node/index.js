import express from "express";

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

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });