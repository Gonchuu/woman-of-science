import multer from "multer";
import path from "path";

import fs from "fs";
import cloudinary from "cloudinary";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//2-Configuración del storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    //02/07/2022 - NombreFichero.png
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../temp"));
  },
});

//3- Configuración del fileFilter
const VALID_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    const error = new Error("Invalid file type");
    cb(error);
  } else {
    cb(null, true);
  }
};

//1-Creo la estructura de upload
const upload = multer({
  //dónde quiero almacenar
  storage,
  //filtro de los ficheros que subamos
  fileFilter,
});

// Nuuevo middleware de subida de archivos
const uploadToCloudinary = async (req, res, next) => {
  if (req.file) {
    try {
      const filePath = req.file.path;
      const image = await cloudinary.v2.uploader.upload(filePath);

      // Borramos el archivo local
      await fs.unlinkSync(filePath);

      // Añadimos la propiedad file_url a nuestro Request
      req.file_url = image.secure_url;
      return next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
};

export { upload, uploadToCloudinary };
