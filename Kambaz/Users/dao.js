import User from './model.js';

export const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

export const findAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const findUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const findUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

export const findUserByCredentials = async (username, password) => {
  const user = await User.findOne({ username, password });
  return user;
};

export const updateUser = async (userId, userUpdates) => {
  const user = await User.findByIdAndUpdate(userId, userUpdates, { new: true });
  return user;
};

export const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};