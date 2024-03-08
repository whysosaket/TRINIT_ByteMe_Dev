import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import CustomRequest from "../types/CustomRequest";

import Schedule from "../models/Scheduled";
import User from "../models/User";
import Class from "../models/Class";
import Notification from "../models/Notification";

const createSchedule = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { classId, date, duration, price } = req.body;
  let user = req.user;

  try {
    // Checking if class exists
    let classData = await Class.findById(classId);
    if (!classData) {
      return res.json({ success, error: "Sorry, Class not found!" });
    }

    // Checking if user exists
    let userData = await User.findById(user.id);
    if (!userData) {
      return res.json({ success, error: "Sorry, User not found!" });
    }

    // Creating schedule
    let schedule = await Schedule.create({
      class: classData._id,
      user: userData._id,
      date,
      duration,
      price,
    });

    // Creating notification
    let notification = await Notification.create({
      user: classData.tutor,
      message: `You have a new schedule request for your class ${classData.title}`,
    });

    success = true;
    return res.json({ success, info: "Schedule Created Successfully!!" });
  } catch (error) {
    console.log(error);
  }
};

const getSchedules = async (req: CustomRequest, res: Response) => {
  let success = false;

  try {
    let schedules = await Schedule.find()
      .populate("class", "title")
      .populate("user", "name email");
    if (!schedules) {
      return res.json({ success, error: "No Schedules Found!" });
    }

    success = true;
    return res.json({ success, schedules });
  } catch (error) {
    console.log(error);
  }
};

const getMySchedules = async (req: CustomRequest, res: Response) => {
  let success = false;
  let user = req.user;

  try {
    let schedules = await Schedule.find({ user: user.id }).populate(
      "class",
      "title"
    );
    if (!schedules) {
      return res.json({ success, error: "No Schedules Found!" });
    }

    success = true;
    return res.json({ success, schedules });
  } catch (error) {
    console.log(error);
  }
};

const respondSchedule = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { scheduleId, response } = req.body;
  let tutor = req.user;

  try {
    // chwecking if response is valid
    if (response != "accepted" && response != "rejected") {
      return res.json({ success, error: "Please, enter a valid response" });
    }

    // Checking if schedule exists
    let scheduleData = await Schedule.findById(scheduleId);
    if (!scheduleData) {
      return res.json({ success, error: "Sorry, Schedule not found!" });
    }

    // Checking if user is a tutor
    let tutorData = await User.findById(tutor.id);
    if (!tutorData) {
      return res.json({ success, error: "Sorry, Tutor not found!" });
    }

    // get class info to get tutor name
    let classData = await Class.findById(scheduleData.class);
    if (!classData) {
      return res.json({ success, error: "Sorry, Class not found!" });
    }

    // check if the tutor is the owner of the class
    if (String(classData.tutor) != tutor.id) {
      return res.json({
        success,
        error: "Sorry, You are not the owner of this class!",
      });
    }

    // Updating schedule
    scheduleData.status = response;
    await scheduleData.save();

    // creating notification
    let notification = await Notification.create({
      user: scheduleData.user,
      message: `Your schedule request for class ${classData.title} has been ${response}`,
    });

    success = true;
    return res.json({ success, info: "Schedule Accepted Successfully!!" });
  } catch (error) {
    console.log(error);
  }
};

const sendTutorFeedback = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { scheduleId, feedback } = req.body;
  let user = req.user;

  try {
    // Checking if schedule exists
    let scheduleData = await Schedule.findById(scheduleId);
    if (!scheduleData) {
      return res.json({ success, error: "Sorry, Schedule not found!" });
    }

    // Checking if user exists
    let userData = await User.findById(user.id);
    if (!userData) {
      return res.json({ success, error: "Sorry, User not found!" });
    }

    // Updating schedule
    scheduleData.tutorFeedback = feedback;
    await scheduleData.save();

    success = true;
    return res.json({ success, info: "Feedback Sent Successfully!!" });
  } catch (error) {
    console.log(error);
  }
};

const sendUserFeedback = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { scheduleId, feedback } = req.body;
  let user = req.user;

  try {
    // Checking if schedule exists
    let scheduleData = await Schedule.findById(scheduleId);
    if (!scheduleData) {
      return res.json({ success, error: "Sorry, Schedule not found!" });
    }

    // Checking if user exists
    let userData = await User.findById(user.id);
    if (!userData) {
      return res.json({ success, error: "Sorry, User not found!" });
    }

    // Updating schedule
    scheduleData.studentFeedback = feedback;
    await scheduleData.save();

    success = true;
    return res.json({ success, info: "Feedback Sent Successfully!!" });
  } catch (error) {
    console.log(error);
  }
};

export {
  createSchedule,
  getSchedules,
  getMySchedules,
  respondSchedule,
  sendTutorFeedback,
  sendUserFeedback,
};
