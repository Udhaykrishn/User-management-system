import { Router } from "express";
import {
  adminLogin,
  getAdminLogin,
  adminLogout,
} from "#service/admin/auth.services.js";
import {
  CreateOneUser,
  deleteUser,
  editUser,
  getEditUser,
  getCreateUser,
} from "#service/admin/curd.services.js";
import { restrictToAdmin } from "#middleware/restrictToAdmin.middleware.js";
import { GetAllUsers } from "#repositorys/user/user.repository.js";

const router = Router();

router
  .get("/signin", restrictToAdmin, getAdminLogin)
  .post("/signin", adminLogin)
  .post("/signout", adminLogout);

router.get("/dashboard", restrictToAdmin, async (req, res) => {
  const users = await GetAllUsers();

  return res.render("admin/panel", { users: users });
});

router.get("/dashboard/createUser", restrictToAdmin, getCreateUser);
router.post("/dashboard/createUser", CreateOneUser);
router.get("/dashboard/edit/:id", restrictToAdmin, getEditUser);
router.post("/dashboard/edit/:id", editUser);
router.delete("/dashboard/delete/:id", deleteUser);
export default router;
