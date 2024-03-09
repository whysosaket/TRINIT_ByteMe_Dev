import React, { useEffect } from "react";
import { motion } from "framer-motion";
import BottomBar from "../components/BottomBar";
import NotificationContext from "../Context/NotificationContext";
import { useContext } from "react";

const bottomBarItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Create Class",
    link: "/tutordashboard/create",
  },
  {
    name: "My Schedules",
    link: "/tutordashboard/myschedules",
  },
  {
    name: "Notifications",
    link: "/tutordashboard/notifications",
  },
];

const TutorNotifications = () => {
  const { notifications, fetchNotifications } = useContext(NotificationContext);
  useEffect(() => {
    fetchNotifications();
  }, []);

  const getDate = (date: string) => {
    return new Date(date).toDateString();
  };
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
            <span className="text-teal-300">{"Notifications "}</span>
          </span>
        </h1>
        {notifications.length === 0 && (
          <h1 className="text-2xl text-white my-4">No Notifications</h1>
        )}

        <div className={`my-4 h-[33rem] no-scrollbar overflow-y-scroll flex`}>
          {notifications.map((notification: any, index: number) => {
            return (
              <div
                key={index}
                className={`${
                  notification.seen ? "bg-black/30" : "bg-white/20"
                } p-4 py-6 m-2 h-20 rounded-md w-full`}
              >
                <h1 className="text-lg font-bold">{notification.message}</h1>
                <p className="text-sm">{getDate(notification.date)}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl font-bold text-white my-auto text-start absolute bottom-20 left-6"
      >
        Tutor
        <span className="text-teal-300">{" Dashboard "}</span>
      </motion.h1>
      <BottomBar items={bottomBarItems} />
    </>
  );
};

export default TutorNotifications;
