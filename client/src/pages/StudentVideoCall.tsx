import { motion } from "framer-motion";
import BottomBar from "../components/BottomBar";
import { useContext, useEffect } from "react";
import VideoStreamShare from "../components/VIdeoCallComponent/VideoCallComponent";


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
      name: "My Schedules",
      link: "/studentdashboard/myschedules",
    },
    {
      name: "Notifications",
      link: "/studentdashboard/notifications",
    }
  ];

const StudentNotification = () => {
 
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
          <span className="text-teal-300">{"Video "}</span>
        </span>
        Conference
      </h1>
   

        <div className={`my-4 h-[33rem] no-scrollbar overflow-y-scroll flex flex-col`}>
          <VideoStreamShare />
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
  )
}

export default StudentNotification