import { verifyToken } from "#utility/jwt.utility.js";

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


export { AuthCheck };
