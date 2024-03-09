import { Router } from "express";
import auth from "./auth";
import classroom from "./classroom";
import search from "./search";


const router = Router();

export default (): Router => {
  auth(router);
  classroom(router);
  search(router);
  return router;
};