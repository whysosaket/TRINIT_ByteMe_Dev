import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import CustomRequest from "../types/CustomRequest";

import Schedule from "../models/Scheduled";
import User from "../models/User";
import Class from "../models/Class";
import Notification from "../models/Notification";
import Tutor from "../models/Tutor";

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

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Set time to the start of the day (midnight)
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day (just before midnight)
    
    // Check if a schedule already exists for this day, for the tutor of this class
    let schedules = await Schedule.find({
      class: classData._id,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    
    if (schedules.length > 0) {
      return res.json({
        success: false,
        error: "Sorry, a schedule already exists for this day!",
      });
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
      date: new Date(),
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
      "title",
    );
    if (!schedules) {
      return res.json({ success, error: "No Schedules Found!" });
    }
    // reverse the schedules array to get the latest schedules first
    schedules = schedules.reverse();

    success = true;
    return res.json({ success, schedules });
  } catch (error) {
    console.log(error);
  }
};

const getTeacherSchedules = async (req: CustomRequest, res: Response) => {
  let success = false;
  let user = req.user;

  try {
    let classes = await Class.find({ tutor: user.id });
    if (!classes) {
      return res.json({ success, error: "No Classes Found!" });
    }

    let schedules = await Schedule.find({ class: { $in: classes } }).populate(
      "class",
      "title",
    );

    if (!schedules) {
      return res.json({ success, error: "No Schedules Found!" });
    }

    // reverse the schedules array to get the latest schedules first
    schedules = schedules.reverse();

    success = true;
    return res.json({ success, schedules });
  } catch (error) {
    console.log(error);
  }
}

const respondSchedule = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { scheduleId, response } = req.body;
  let tutor = req.user;

  try {
    // chwecking if response is valid
    if (response != "approved" && response != "rejected") {
      return res.json({ success, error: "Please, enter a valid response" });
    }

    // Checking if schedule exists
    let scheduleData = await Schedule.findById(scheduleId);
    if (!scheduleData) {
      return res.json({ success, error: "Sorry, Schedule not found!" });
    }

    // Checking if user is a tutor
    let tutorData = await Tutor.findById(tutor.id);
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
      date: new Date()
    });

    success = true;
    return res.json({ success, info: "Schedule Updated!!" });
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

const getNotifications = async (req: CustomRequest, res: Response) => {
  let success = false;
  let user = req.user;

  try {
    let notifications = await Notification.find({ user: user.id });
    if (!notifications) {
      notifications = await Notification.find({ tutor: user.id });
    }
    if (!notifications) {
      return res.json({ success, error: "No Notifications Found!" });
    }

    // reverse the notifications array to get the latest notifications first
    notifications = notifications.reverse();
    let sendNotif = [];
    // mark all notifications as read
    for (let i = 0; i < notifications.length; i++) {
      sendNotif.push(notifications[i]);
      notifications[i].seen = true;
      await notifications[i].save();
    }

    success = true;
    return res.json({ success, notifications: sendNotif });
  } catch (error) {
    console.log(error);
  }
}

export {
  createSchedule,
  getSchedules,
  getMySchedules,
  respondSchedule,
  sendTutorFeedback,
  sendUserFeedback,
  getTeacherSchedules,
  getNotifications,
};
