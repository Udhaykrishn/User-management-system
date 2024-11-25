import { verifyToken } from "../utility/jwt.utility.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log(token);
  if (!token) {
    return res.status(401).redirect("/user/signin");
  }
  try {
    const payload = verifyToken(token);

    console.log(payload);

    req.user = payload;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).redirect("/user/signin");
  }
};

export { isAuthenticated };

const AuthCheck = (req, res, next) => {
  try {
    const token = req.cookies?.authToken;

    if (token) {
      const decoded = verifyToken(token);

      if (decoded) {
        return res.redirect("/user/dashboard");
      }
    }
    return next();
  } catch (error) {
    return next();
  }
};

export { AuthCheck };
