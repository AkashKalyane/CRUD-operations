const HttpError = require("../models/http-error");

const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, while searching for the id.",
      500
    );
  }
  if (!user) {
    const error = new HttpError(
      "User does not exist, for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ user });
};

const createUser = async (req, res, next) => {
  const { name, salary, email } = req.body;
  if (!name || !salary || !email) {
    const error = new HttpError("Please provide required information.", 404);
    return next(error);
  }
  const createdUser = new User({
    name,
    salary,
    email,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Creating user failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ user: createdUser });
};

const updateUser = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, while finding user by id.",
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError(
      "User does not exist, for the provided id.",
      404
    );
    return next(error);
  }
  const { name, salary, email } = req.body;

  user.name = name || user.name;
  user.salary = salary || user.salary;
  user.email = email || user.email;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, while updating user.",
      500
    );
    return next(error);
  }

  res.json({ updatedUser: user });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {}
  if (!user) {
    const error = new HttpError(
      "User does not exist, for the provided id.",
      404
    );
    return next(error);
  }
  try {
    // await User.deleteOne({ _id: userId });
    await user.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "there was a problem deleting user, please try again. ",
      404
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted user." });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
