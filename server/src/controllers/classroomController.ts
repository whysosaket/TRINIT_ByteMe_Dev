import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import CustomRequest from "../types/CustomRequest";

import Tutor from "../models/Tutor";
import Class from "../models/Class";

const createClass = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { title, description, language, price, duration } = req.body;
  let user = req.user;

  try {
    // Checking if user is a tutor
    let tutorData = await Tutor.findById(user.id);
    if (!tutorData) {
      return res.json({ success, error: "Sorry, Tutor not found!" });
    }

    // Creating class
    let classData = await Class.create({
      title,
      description,
      tutor: tutorData._id,
      language,
      price,
      duration,
    });

    success = true;
    return res.json({ success, info: "Class Created Successfully!!" });
  } catch (error) {
    console.log(error);
  }
};

const getClasses = async (req: CustomRequest, res: Response) => {
  let success = false;

  try {
    let classes = await Class.find().populate("tutor", "name email");
    if (!classes) {
      return res.json({ success, error: "No Classes Found!" });
    }

    success = true;
    return res.json({ success, classes });
  } catch (error) {
    console.log(error);
  }
};

const getMyClasses = async (req: CustomRequest, res: Response) => {
  let success = false;
  let user = req.user;

  try {
    let classes = await Class.find({ tutor: user.id });
    if (!classes) {
      return res.json({ success, error: "No Classes Found!" });
    }

    success = true;
    return res.json({ success, classes });
  } catch (error) {
    console.log(error);
  }
};

const getClass = async (req: CustomRequest, res: Response) => {
  let success = false;
  let { id } = req.params;

  try {
    let classData = await Class.findById(id).populate("tutor", "name email");
    if (!classData) {
      return res.json({ success, error: "No Class Found!" });
    }

    success = true;
    return res.json({ success, class: classData });
  } catch (error) {
    console.log(error);
  }
};

export { createClass, getClasses, getMyClasses, getClass };
