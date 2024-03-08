import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Tutor from "../models/Tutor";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  isEmailValid,
  toTitleCase,
  generateRandomString,
} from "../utils/UserHelper";
import CustomRequest from "../types/CustomRequest";

const JWT_SECRET = process.env.JWT_SECRET as string;

const createUser = async (req: Request, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let data = req.body;

  try {
    // Checking if email is valid
    if (!isEmailValid(data.email)) {
      return res.json({ success, error: "Please, enter a valid email" });
    }

    // Checking if user already exists
    let user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({
        success,
        error: "Sorry, Email ID is already registered!",
      });
    }

    // Using bcrypt to generate a secured password
    // Crating a salt from bcrypt
    const securedPassword = await bcrypt.hash(data.password.toString(), 10);

    // Converting the name to title case
    data.name = toTitleCase(data.name);

    // Creating the user
    user = await User.create({
      name: data.name,
      password: securedPassword,
      email: data.email,
      languages: data.languages,
    });

    success = true;
    return res.json({ success, info: "Account Created Successfully!!" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  let success = false;

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();

    if (!user) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);
    success = true;
    return res.json({ success, authtoken });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const getUserInfo = async (req: CustomRequest, res: Response) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.json({ error: "No User Found!" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const createTutor = async (req: Request, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let data = req.body;

  try {
    // Checking if email is valid
    if (!isEmailValid(data.email)) {
      return res.json({ success, error: "Please, enter a valid email" });
    }

    // Checking if user already exists
    let tutor = await Tutor.findOne({ email: data.email });
    if (tutor) {
      return res.status(400).json({
        success,
        error: "Sorry, Email ID is already registered!",
      });
    }

    // Using bcrypt to generate a secured password
    // Crating a salt from bcrypt
    const securedPassword = await bcrypt.hash(data.password.toString(), 10);

    // Converting the name to title case
    data.name = toTitleCase(data.name);

    // Creating the user
    tutor = await Tutor.create({
      name: data.name,
      password: securedPassword,
      email: data.email,
      languages: data.languages,
      description: data.description,
    });

    success = true;
    return res.json({ success, info: "Account Created Successfully!!" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const loginTutor = async (req: Request, res: Response) => {
  let success = false;

  const { email, password } = req.body;

  try {
    let tutor = await Tutor.findOne({ email }).exec();

    if (!tutor) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      password.toString(),
      tutor.password
    );

    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const payload = {
      tutor: {
        id: tutor.id,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);

    success = true;

    return res.json({ success, authtoken });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

export { createUser, loginUser, getUserInfo, createTutor, loginTutor};
