import { validate } from "deep-email-validator";

const isEmailValid = async (email) => {
  const result = await validate(email);

  if (result.valid) {
    return true;
  } else {
    return false;
  }
};

export { isEmailValid };
