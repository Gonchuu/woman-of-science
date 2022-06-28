import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
//import { from } from "responselike";

// Creamos los salts de bcrypt, a mas salts más seguro pero más lento
const saltRounds = 10;

//REGISTER
passport.use(
  "register",
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Primero buscamos si el usuario existe en nuestra DB
        const previousUser = await User.findOne({ email: email });

        // Si hay usuario previamente, lanzamos un error
        if (previousUser) {
          const error = new Error("The user is already registered!");
          return done(error);
        }

        // Si no existe el usuario, vamos a "hashear" el password antes de registrarlo
        const pwdHash = await bcrypt.hash(password, saltRounds);

        // Creamos el nuevo user y lo guardamos en la DB
        const newUser = new User({
          email: email,
          password: pwdHash,
        });

        const savedUser = await newUser.save();

        // Invocamos el callback con null donde iría el error y el usuario creado
        done(null, savedUser);
      } catch (error) {
        // Si hay un error, resolvemos el callback con el error
        return done(error);
      }
    }
  )
);

//LOGIN
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Primero buscamos si el usuario existe en nuestra DB
        const currentUser = await User.findOne({ email: email });

        // Si NO existe el usuario, tendremos un error...
        if (!currentUser) {
          const error = new Error("The email & password combination is incorrect!");
          return done(error);
        }

        // // Si existe el usuario, vamos a comprobar si su password enviado coincide con el registrado
        const isValidPassword = await bcrypt.compare(
          password,
          currentUser.password
        );

        // Si el password no es correcto, enviamos un error a nuestro usuario
        if (!isValidPassword) {
          const error = new Error(
            "The email & password combination is incorrect!"
          );
          return done(error);
        }

        // Si todo se valida correctamente, eliminamos la contraseña del usuario devuelto
        // por la db y completamos el callback con el usuario
        currentUser.password = null;
        return done(null, currentUser);
      } catch (error) {
        // Si hay un error, resolvemos el callback con el error
        return done(error);
      }
    }
  )
);

// Esta función usará el usuario de req.LogIn para registrar su id.
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

// Esta función buscará un usuario dada su _id en la DB y populará req.user si existe
passport.deserializeUser(async (userId, done) => {
  try {
    const existingUser = await User.findById(userId);
    return done(null, existingUser);
  } catch (err) {
    return done(err);
  }
});

const isAuth = (req, res, next) => {
	// Si el Boolean de autenticación devuelve true, avanzamos al siguiente punto
  if (req.isAuthenticated()) {
    return next();
  } else {
		// En caso de no hacer usuarios logeados, redireccionamos a login
    return res.status(401).json('No esta logueado');  }
}

export { isAuth};
