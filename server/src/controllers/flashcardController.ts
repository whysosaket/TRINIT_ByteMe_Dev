import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import CustomRequest from "../types/CustomRequest";

import Flashcard from "../models/Flashcard";
import Class from "../models/Class";
import User from "../models/User";
import Scheduled from "../models/Scheduled";

const createFlashcard = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { classId, scheduled, question, answer } = req.body;
  let user = req.user;

  try {

    // Checking if user exists
    let userData = await User.findById(user.id);
    if (!userData) {
      return res.json({ success, error: "Sorry, User not found!" });
    }

    // Creating flashcard
    let flashcard = await Flashcard.create({
      user: userData._id,
      question,
      answer,
    });

    success = true;
    return res.json({ success, info: "Flashcard Created Successfully!!" });
  } catch (error) {
    console.log(error);
  }
};

const updateFlashcard = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { flashcardId, content } = req.body;
  let user = req.user;

  try {
    // Checking if flashcard exists
    let flashcardData = await Flashcard.findById(flashcardId);
    if (!flashcardData) {
      return res.json({ success, error: "Sorry, Flashcard not found!" });
    }

    // Checking if user exists
    let userData = await User.findById(user.id);
    if (!userData) {
      return res.json({ success, error: "Sorry, User not found!" });
    }

    // Checking if user is the owner of the flashcard
    if (String(flashcardData.user) != user.id) {
      return res.json({ success, error: "Sorry, You are not the owner!" });
    }

    // Updating flashcard
    let flashcard = await Flashcard.findByIdAndUpdate(flashcardId, {
      content: content,
    });

    success = true;
    return res.json({ success, info: "Flashcard Updated Successfully!!" });
  } catch (error) {
    console.log(error);
  }
};

const getFlashcards = async (req: CustomRequest, res: Response) => {
  let success = false;

  let user = req.user;

  try {
    // Checking if user exists
    let userData = await User.findById(user.id);
    if (!userData) {
      return res.json({ success, error: "Sorry, User not found!" });
    }

    // Checking if flashcards exists
    let flashcards = await Flashcard.find({ user: user.id });
    if (!flashcards) {
      return res.json({ success, error: "Sorry, Flashcards not found!" });
    }

    success = true;
    return res.json({ success, flashcards });
  } catch (error) {
    console.log(error);
  }
};

const getFlashcard = async (req: CustomRequest, res: Response) => {
  let success = false;
  let user = req.user;
  let flashcardId = req.params.id;

  try {
    // Checking if user exists
    let userData = await User.findById(user.id);

    if (!userData) {
      return res.json({ success, error: "Sorry, User not found!" });
    }

    // Checking if flashcard exists

    let flashcard = await Flashcard.findById(flashcardId);
    if (!flashcard) {
      return res.json({ success, error: "Sorry, Flashcard not found!" });
    }

    success = true;

    return res.json({ success, flashcard });
  } catch (error) {
    console.log(error);
  }
};

export { createFlashcard, updateFlashcard, getFlashcards, getFlashcard };
