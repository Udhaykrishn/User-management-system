import {
  CreateOneUser,
  getUserByEmail,
  UserAlreadyExsists,
} from "#repositorys/user/user.repository.js";
import { signToken } from "#utility/jwt.utility.js";

const getLogin = (req, res) => {
  return res.render("user/login", { error: null });
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("user/login", {
        error: "Email and password is required",
      });
    }

    const findUser = await getUserByEmail(email);

    if (!findUser) {
      return res.render("user/login", {
        error: "User not found,Please try again or Signup",
      });
    }

    if (findUser.password !== password) {
      return res.render("user/login", {
        error: "Password is Wrong,please try again",
      });
    }

    const token = signToken({ email });
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.redirect("/user/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const userLogout = (req, res) => {
  res.clearCookie("authToken");
  res.redirect("/user/signin");
};

const postSignUp = async (req, res) => {
  try {
    const { email, password, confirm } = req.body;

    if (!email || !password || !confirm) {
      return res.render("user/signup", {
        error: "email and password is required",
      });
    }

    if (password !== confirm) {
      return res.render("user/signup", {
        error: "Password is does not match!",
      });
    }

    const alreadyExists = await UserAlreadyExsists(email);

    if (alreadyExists) {
      return res.render("user/signup", { error: "User is already exsist" });
    }

    const user = await CreateOneUser({ email, password });
    await user.save();

    return res.redirect("/user/signin");
  } catch (error) {
    console.error(error.message);
    console.log(error);
  }
};

const getSignUp = (req, res) => {
  res.render("user/signup", { error: null });
};

export { postSignUp, getLogin, postLogin, userLogout, getSignUp };
