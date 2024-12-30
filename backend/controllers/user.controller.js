import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const newlyRegistered = new User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });
    //const newUser = await newlyRegistered.save(); // save to db
    if (!newlyRegistered) {
      return res.status(400).json("couldn't create user, something went wrong");
    }
    res.status(200).json(newlyRegistered._id);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const login = async (req, res) => {
  try {
    //find by username
    const userFound = await User.findOne({username: req.body.username})
    if (!userFound) {
      return res
        .status(404)
        .json("user not found, please register and try again");
    }
    const passValidity = await bcrypt.compare(
      req.body.password,
      userFound.password
    );
    if (!passValidity) {
      return res.status(400).json("wrong password ");
    }
    res.status(200).json({ _id: userFound._id, username: userFound.username });
  } catch (err) {
    return res.status(500).json(err);
  }
};
