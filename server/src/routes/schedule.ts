import { Router, Response } from "express";
import {
    createSchedule,
    getSchedules,
    getMySchedules,
    respondSchedule,
    sendTutorFeedback,
    sendUserFeedback,
  } from "../controllers/scheduleController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/schedule/createschedule").post(fetchuser, (req: any, res: Response)=>createSchedule(req, res));
    router.route("/api/schedule/getschedules").get(fetchuser, (req: any, res: Response)=>getSchedules(req, res));
    router.route("/api/schedule/getmyschedules").get(fetchuser, (req: any, res: Response)=>getMySchedules(req, res));
    router.route("/api/schedule/respondschedule").post(fetchuser, (req: any, res: Response)=>respondSchedule(req, res));
    router.route("/api/schedule/sendtutorfeedback").post(fetchuser, (req: any, res: Response)=>sendTutorFeedback(req, res));
    router.route("/api/schedule/senduserfeedback").post(fetchuser, (req: any, res: Response)=>sendUserFeedback(req, res));
} 