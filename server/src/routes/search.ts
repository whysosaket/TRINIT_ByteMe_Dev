import { Router, Response } from "express";

import { getClasses, getTutors } from "../controllers/searchController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/search/getclasses").post((req: any, res: Response)=>getClasses(req, res));
    router.route("/api/search/gettutors").post(fetchuser, (req: any, res: Response)=>getTutors(req, res));
} 