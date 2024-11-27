import { Router } from "express";
import { AuthCheck } from "#middleware/authchecker.middleware.js";

const router = Router();

router.get("/", AuthCheck, (req, res) => {
  return res.redirect("/user/signin");
});

export default router;
