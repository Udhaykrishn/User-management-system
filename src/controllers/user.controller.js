import { Router } from "express";
import { getLogin, postLogin, userLogout } from "../services/login.service.js";
import { getSignUp, postSignUp } from "../services/signup.service.js";
import { AuthCheck } from "../middleware/authchecker.middleware.js";
import { isAuthenticated } from "../middleware/jwt.middleware.js";

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
