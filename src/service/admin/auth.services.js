import { signToken } from "#utility/jwt.utility.js";

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
  console.log(Admin);
  console.log(user);
  if (!user) {
    return res.render("admin/login", {
      error: "Admin is not found",
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
  });

  return res.redirect("/admin/dashboard");
};

const adminLogout = (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin/signin");
};

export { getAdminLogin, adminLogin, adminLogout };
