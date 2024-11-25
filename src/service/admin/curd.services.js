import { User } from "../../model/user.model.js";

const getAlluser = async (req, res) => {
  try {
    return await User.find();
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

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.render("admin/createUserForm", {
        error: "User is already exists",
      });
    }

    const newUser = new User({ email, password });

    const savedUser = (await newUser.save()).toObject();

    delete savedUser.password;

    // res.render("admin/panel", { message: "User created successfully" });
    res.redirect("/admin/dashboard");
  } catch (error) {
    return res.render("admin/createUserForm", { error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

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

    await User.findByIdAndUpdate(id, {
      email,
      password,
    });

    return res.redirect("/admin/dashboard");
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEditUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findById(id);
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
