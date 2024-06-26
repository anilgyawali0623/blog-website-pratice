import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    !username ||
    !email ||
    !password
  ) {
    next(ErrorHandler(400, "all field needs to be filled"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.json({ message: "saved in the data  base" });
  } catch (error) {
    next(error);
  }
};
