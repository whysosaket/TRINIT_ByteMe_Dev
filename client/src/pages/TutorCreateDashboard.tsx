import BottomBar from "../components/BottomBar";
import { motion } from "framer-motion";
import CreateClassImage from "../assets/createclass.svg";
import { CreateClassForm } from "../components/TutorDashboard/CreateClassForm";
import Atropos from "atropos/react";

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

export const TutorCreateDashboard = () => {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="px-6"
      >
        <h1
        className="text-3xl w-full font-bold text-white my-auto text-end"
        >
            <span>
                <span className="text-teal-300">{"Create "}</span>
            </span>
            Class
        </h1>

        <div className="flex">
        <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex justify-center align-middle w-1/2 hover:opacity-70 px-8">
        <Atropos
          activeOffset={70}
          shadowScale={1.05}
          onEnter={() => console.log("Enter")}
          onLeave={() => console.log("Leave")}
          onRotate={(x, y) => console.log("Rotate", x, y)}
          className="m-auto "
        >
          <img src={CreateClassImage} className="" />
        </Atropos>
      </motion.div>
          <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-1/2 px-8">
          <CreateClassForm />
          </motion.div>
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
