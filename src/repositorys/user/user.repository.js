import { User } from "#model/users.model.js";

const GetAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error.message);
  }
};

const createUser = async ({ email, password }) => {
  const newUser = new User({ email, password });
  await newUser.save();
};

const GetOneUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error.message);
    throw new Error(error);
  }
};

const CreateOneUser = async (email, password, role = "user") => {
  try {
    const newUser = new User({ email, password, role });
    return newUser;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

const DeleteOneUser = async (id) => {
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    return deleteUser;
  } catch (error) {
    console.log(error.message);
  }
};

const DeleteAllUser = async () => {
  try {
    const deleteAll = await User.deleteMany({});
    return deleteAll.deletedCount;
  } catch (error) {
    console.log(error.message);
  }
};

const UserAlreadyExsists = async (email) => {
  try {
    const user = await User.findOne({ email });
    return !!user;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const UpdateOneUser = async (id, updateData) => {
  try {
    const updateOneUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updateOneUser;
  } catch (error) {
    console.log(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Fail to fetch user information");
  }
};

export {
  CreateOneUser,
  DeleteAllUser,
  DeleteOneUser,
  UpdateOneUser,
  GetAllUsers,
  GetOneUser,
  UserAlreadyExsists,
  getUserByEmail,
  createUser
};
