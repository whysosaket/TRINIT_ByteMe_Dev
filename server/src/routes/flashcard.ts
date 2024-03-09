import { Router, Response } from "express";

import { createFlashcard, updateFlashcard, getFlashcards, getFlashcard } from "../controllers/flashcardController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/flashcard/create").post(fetchuser, (req: any, res: Response)=>createFlashcard(req, res));
    router.route("/api/flashcard/update/:id").put(fetchuser, (req: any, res: Response)=>updateFlashcard(req, res));
    router.route("/api/flashcard/getflashcards").get(fetchuser, (req: any, res: Response)=>getFlashcards(req, res));
    router.route("/api/flashcard/getflashcard/:id").get(fetchuser, (req: any, res: Response)=>getFlashcard(req, res));
} 