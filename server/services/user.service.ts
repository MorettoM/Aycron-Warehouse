import { Schema } from "mongoose";
import { User, UserDocument } from "@models/user.model";
import dayjs from "dayjs";

export const getUser = (user: UserDocument) => user.hidePassword();

export const createUser = ({
  username,
  email,
  password,
  isAdmin
}: {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}) => new User({ username, email, password, isAdmin });

export const findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value });

export const findUserById = async (id: typeof Schema.Types.ObjectId) => await User.findById(id);

export const saveUser = async (user: UserDocument) => await user.save();

export const setUserPassword = async (user: UserDocument, password: string) => {
  user.password = password;
  user.passwordResetToken = "";
  user.passwordResetExpires = dayjs().toDate();
  return await user.hashPassword();
};

export const deleteUserById = async (user: UserDocument) => await User.findByIdAndDelete(user._id);


export default {
  getUser,
  createUser,
  findUserBy,
  findUserById,
  saveUser,
  setUserPassword,
  deleteUserById,
};
