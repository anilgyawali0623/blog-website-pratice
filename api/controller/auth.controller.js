import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!password || !email || password === "" || email === "") {
    next(ErrorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(ErrorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(ErrorHandler(400, "invalid password"));
    }

     const  token= jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
     // this  part needs to be recall 

     const {password:pass,...rest}=  validUser._doc;
 res.status(2000)
 .cookie("access_token", token, {
   httpOnly:true,
 })
  } catch (error) {
    next(error);
  }
};
