import { Router } from "express";
import {
  adminLogin,
  getAdminLogin,
  adminLogout,
} from "../services/admin/login.services.js";
import {
  CreateOneUser,
  deleteUser,
  editUser,
  getEditUser,
  getCreateUser,
} from "../services/admin/curd.services.js";
import { adminCheck } from "../middleware/adminchecker.middleware.js";
import { restrictToAdmin } from "../middleware/restrictToAdmin.middleware.js";
import { User } from "../model/user.model.js";
const router = Router();

router
  .get("/signin", adminCheck, getAdminLogin)
  .post("/signin", adminLogin)
  .post("/signout", adminLogout);

router.get("/dashboard", restrictToAdmin, async (req, res) => {
  const users = await User.find();

  return res.render("admin/panel", { users: users });
});

router.get("/dashboard/createUser", restrictToAdmin, getCreateUser);
router.post("/dashboard/createUser", CreateOneUser);
router.get("/dashboard/edit/:id", restrictToAdmin, getEditUser);
router.post("/dashboard/edit/:id", editUser);
router.delete("/dashboard/delete/:id", deleteUser);
export default router;
