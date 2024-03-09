import { Router } from "express";
import auth from "./auth";
import classroom from "./classroom";
import search from "./search";
import schedule from "./schedule";


const router = Router();

export default (): Router => {
  auth(router);
  classroom(router);
  search(router);
  schedule(router);
  return router;
};