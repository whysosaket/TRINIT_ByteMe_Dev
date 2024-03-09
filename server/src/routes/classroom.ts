import { Router, Response } from "express";

import { createClass, getClasses, getMyClasses, getClass } from "../controllers/classroomController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/class/create").post(fetchuser, (req: any, res: Response)=>createClass(req, res));
    router.route("/api/class/getclasses").get((req: any, res: Response)=>getClasses(req, res));
    router.route("/api/class/getmyclasses").get(fetchuser, (req: any, res: Response)=>getMyClasses(req, res));
    router.route("/api/class/getclass/:id").get((req: any, res: Response)=>getClass(req, res));
} 