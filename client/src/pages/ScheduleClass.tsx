import { motion } from "framer-motion";
import BottomBar from "../components/BottomBar";
import { useState, useEffect, useContext, useRef } from "react";
import "../styles/studentDaashboard.css";
import DatePicker from "../components/studentDashboard/DatePicker";
import Book from "../components/studentDashboard/Book";

const bottomBarItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Search",
    link: "/studentdashboard/",
  },
  {
    name: "Show Classes",
    link: "/tutordashboard/show",
  },
];

const ScheduleClass = () => {



  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="px-6"
      >
        <h1 className="text-3xl text-end font-bold text-white my-auto">
          <span>
            <span className="text-teal-300">{"Schedule "}</span>
          </span>
          Classes
        </h1>     
          <div
            className={`my-4 h-[33rem] no-scrollbar overflow-y-scroll flex justify-start gap-4`}
          >
            <DatePicker />
            <div className="w-1/2">
                <Book />
            </div>
          </div>
      </motion.div>
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl font-bold text-white my-auto text-start absolute bottom-20 left-6"
      >
        Student
        <span className="text-teal-300">{" Dashboard "}</span>
      </motion.h1>
      <BottomBar items={bottomBarItems} />
    </>
  );
};

export default ScheduleClass;
