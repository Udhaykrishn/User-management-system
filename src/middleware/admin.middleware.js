import { verifyToken } from "#utility/jwt.utility.js";

const adminCheck = async (req, res, next) => {
  const adminToken = req.cookies?.adminToken;

  if (adminToken) {
    const decoded = verifyToken(adminToken);

    if (decoded.role === "admin") {
      return res.redirect("/admin/dashboard");
    } else {
      return res.redirect("/user/dashboard");
    }
  }

  return next();
};

export { adminCheck };
