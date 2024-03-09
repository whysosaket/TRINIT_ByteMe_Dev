import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import Tutor from "../models/Tutor";
import Class from "../models/Class";
import CustomRequest from "../types/CustomRequest";


const getClasses = async (req: CustomRequest, res: Response) => {
    let success = false;
   
    let {search, price, duration} = req.body;
    console.log(search, price, duration);
    if(!search) {
        search = "";
    }

    // search can be title, description, language partiall match
     try{
        let searchRegex = new RegExp(search, 'i'); // 'i' flag for case-insensitive search

        let classes = await Class.find({
          $or: [
            { title: { $regex: searchRegex } }, 
            { description: { $regex: searchRegex } }, 
            { language: { $regex: searchRegex } }
          ]
        });
        
        if (!classes || classes.length === 0) {
          return res.json({ success: false, error: "No Classes Found!" });
        }
        

        // filter classes based on price and duration where price and duration inside of classes are arrays
        if (price) {
            classes = classes.filter((cls) => {
                let v1, v2, v3;
                if(cls.price.length === 1){
                    v1 = cls.price[0];
                    v2 = cls.price[0];
                    v3 = cls.price[0];
                } else if(cls.price.length === 2){
                    v1 = cls.price[0];
                    v2 = cls.price[1];
                    v3 = cls.price[1];
                }
                else{
                    v1 = cls.price[0];
                    v2 = cls.price[1];
                    v3 = cls.price[2];
                }

                return (v1 <= price || v2 <= price || v3 <= price);
            });
        }
        

        if(duration){
            classes = classes.filter((cls: any) => {
                return cls.duration.includes(duration);
            });
        }

        success = true;
        return res.json({ success, classes });
     } catch (error) {
        console.log(error);
    }
}

const getTutors = async (req: CustomRequest, res: Response) => {
    let success = false;
    const {search} = req.body;
    try{
        let tutors = await Tutor.find({$or: [{name: search}, {description: search}, {language: search}]});
        if (!tutors) {
            return res.json({ success, error: "No Tutors Found!" });
        }
        success = true;
        return res.json({ success, tutors });
     } catch (error) {
        console.log(error);
    }
}

export { getClasses, getTutors };
