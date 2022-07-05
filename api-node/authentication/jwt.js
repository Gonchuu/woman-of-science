import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    //Comprobamos que existe autorización
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }

  const splits = authorization.split(" ");
  if (splits.length !== 2 || splits[0] !== "Bearer") {
    //
    return res.status(401).json({
      status: 400,
      message: "Bad Request",
      data: null,
    });
  }

  const jwtString = splits[1];

  try {
    var token = jwt.verify(jwtString, req.app.get("secretKey")); //verificamos que el token tiene una firma correcta
  } catch (err) {
    return next(err);
  }

  const authority = {
    id: token.id,
    email: token.email,
  };

  req.authority = authority;
  next();
};

export { isAuth };
