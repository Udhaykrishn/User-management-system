import {
  CreateOneUser,
  DeleteOneUser,
  GetAllUsers,
  GetOneUser,
  getUserByEmail,
  UpdateOneUser,
} from "#repositorys/user/user.repository.js";

const getAlluser = async (req, res) => {
  try {
    return await GetAllUsers();
  } catch (error) {
    throw new Error("Error during fetch user information");
  }
};

const getCreateUser = (_, res) => {
  return res.render("admin/createUserForm", { error: null });
};

const CreateOneUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.render("admin/createUserForm", {
        error: "Email and password is required",
      });
    }

    const existUser = await getUserByEmail(email);

    if (existUser) {
      return res.render("admin/createUserForm", {
        error: "User is already exists",
      });
    }

    const newUser = await CreateOneUser({ email, password });

    const savedUser = await newUser.toObject();

    delete savedUser.password; // deletng the password after save the user data

    res.redirect("/admin/dashboard");
  } catch (error) {
    return res.render("admin/createUserForm", { error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await DeleteOneUser(id);

    if (!user) {
      return res
        .status(404)
        .json({ deleteUser: false, message: "User not found" });
    }

    return res.json({ deleteUser: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ deleteUser: false, message: "Server error" });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.redirect(`/admin/dashboard/edit/${id}`);
    }

    await UpdateOneUser(id, { email, password });

    return res.redirect("/admin/dashboard");
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEditUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await GetOneUser(id);
    res.render("admin/EditUser", { user, error: null, userId: id });
  } catch (error) {
    console.log("Error during fetch user deatils", error.message);
  }
};

export {
  getAlluser,
  deleteUser,
  CreateOneUser,
  getCreateUser,
  getEditUser,
  editUser,
};
