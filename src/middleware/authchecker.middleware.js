import { verifyToken } from "../utility/jwt.utility.js";

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
