import { Router } from "express";
import {
  adminLogin,
  getAdminLogin,
  adminLogout,
} from "#service/admin/auth.services.js";
import {
  createOneUser,
  deleteUser,
  editUser,
  getEditUser,
  getCreateUser,
} from "#service/admin/curd.services.js";
import { restrictToAdmin } from "#middleware/restrictToAdmin.middleware.js";
import { GetAllUsers } from "#repositorys/user/user.repository.js";
import { adminCheck } from "#middleware/admin.middleware.js";

const router = Router();

router
  .get("/signin", adminCheck, getAdminLogin)
  .post("/signin", adminLogin)
  .post("/signout", adminLogout);

router.get("/dashboard", restrictToAdmin, async (req, res) => {
  const users = await GetAllUsers();

  console.log(users);

  return res.render("admin/panel", { users: users });
});

router.get("/dashboard/createUser", restrictToAdmin, getCreateUser);
router.post("/dashboard/createUser", createOneUser);
router.get("/dashboard/edit/:id", restrictToAdmin, getEditUser);
router.post("/dashboard/edit/:id", editUser);
router.delete("/dashboard/delete/:id", deleteUser);
export default router;
