import { verifyToken } from "#utility/jwt.utility.js";

const restrictToAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;
    const userToken = req.cookies?.authToken;

    if (userToken) {
      return res.redirect("/user/dashboard");
    }

    if (token) {
      const decoded = verifyToken(token);

      if (decoded.role === "admin") {
        return next();
      } else {
        return res.status(403).json({
          error: "Access denied",
          message: "User does not have admin access",
        });
      }
    }
    return next();
  } catch (error) {
    console.error("Error verifying token", error.message);
    return res.status(403).json({ error: "Access denied" });
  }
};

export { restrictToAdmin };
