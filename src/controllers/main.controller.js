import { Router } from "express";
import { AuthCheck } from "../middleware/jwt.middleware.js";

const router = Router();

router.get("/", AuthCheck, (req, res) => {
  return res.redirect("/user/signin");
});

export default router;
