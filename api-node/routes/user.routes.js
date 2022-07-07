import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res, next) => {
  try {
    const { body } = req;

    //Comprobamos usuario
    const previousUser = await User.findOne({ email: body.email });

    //si no exite el usuario, tendremos un error
    if (previousUser) {
      const error = new Error("The user is already registered!");
      return next(error);
    }

    //encriptar password

    const pwdHash = await bcrypt.hash(body.password, 10);

    //crear usuario en db
    const newUser = new User({
      email: body.email,
      password: pwdHash,
    });

    const savedUser = await newUser.save();

    //respuesta
    return res.status(201).json({
      status: 201,
      message: "User registered successfully!",
      data: {
        id: savedUser._id,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { body } = req;

    //comprobar email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      const error = {
        status: 401,
        message: "The email & password combination is incorrect!",
      };
      return next(error);
    }

    //comprobar password
    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) {
      const error = new Error("The email & password combination is incorrect!");
      return next(error);
    }

    //token JWT

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      req.app.get("secretKey"),
      { expiresIn: "1h" }
    );

    //Respuesta
    return res.json({
      status: 200,
      message: "Loggin success",
      data: { userId: user._id, token: token },
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    req.authority = null;
    return res.json({
      status:200,
      message:'Logout!',
      token:null
    });
  } catch (error) {
    next(error)
  }
});

export { router as userRoutes };
