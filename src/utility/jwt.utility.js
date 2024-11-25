import jwt from "jsonwebtoken";

const signToken = (payload) => {
  console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
};

export { signToken, verifyToken };
