import { Router } from "express";
import {
  postSignUp,
  getLogin,
  postLogin,
  userLogout,
  getSignUp,
} from "#service/user/auth.service.js";
import { AuthCheck } from "#middleware/authchecker.middleware.js";
import { isAuthenticated } from "#middleware/jwt.middleware.js";

const router = Router();

router
  .get("/signin", AuthCheck, getLogin)
  .post("/signin", postLogin)
  .post("/logout", userLogout);
router.get("/signup", AuthCheck, getSignUp).post("/signup", postSignUp);

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("user/dashboard");
});

export default router;
