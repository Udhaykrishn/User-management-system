import { hash, verify } from "argon2";

const passwordHashed = async (password) => {
  try {
    const hasedPassword = await hash(password);
    return hasedPassword;
  } catch (error) {
    console.log(error.message);
  }
};

const passwordCompare = async (hashedPass, password) => {
  try {
    const comparedPassword = await verify(hashedPass, password);
    return comparedPassword;
  } catch (error) {
    console.log(error.message);
  }
};

export { passwordHashed, passwordCompare };
