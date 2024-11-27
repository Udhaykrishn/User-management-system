import { Admin } from "#model/admin.model.js";

const findOneAdmin = async (email) => {
  try {
    const user = await Admin.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error during fetch admin information");
  }
};

export { findOneAdmin };
