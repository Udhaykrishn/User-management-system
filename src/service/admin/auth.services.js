import { findOneAdmin } from "#repositorys/admin/admin.repository.js";
import { GetAllUsers } from "#repositorys/user/user.repository.js";
import { signToken } from "#utility/jwt.utility.js";

const getAdminDashboard = async (req, res) => {
  const users = await GetAllUsers();

  return res.render("admin/panel", { users: users });
};

const getAdminLogin = (req, res) => {
  return res.render("admin/login", { error: null });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("admin/login", {
      error: "Admin Email and Password is required",
    });
  }

  const user = await findOneAdmin(email);
  if (!user) {
    return res.render("admin/login", {
      error: "Admin is not found",
    });
  }

  if (user.password !== password) {
    return res.render("admin/login", {
      error: "Password is wrong",
    });
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = signToken(payload);

  res.cookie("adminToken", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  return res.redirect("/admin/dashboard");
};

const adminLogout = (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin/signin");
};

export { getAdminLogin, adminLogin, adminLogout, getAdminDashboard };
