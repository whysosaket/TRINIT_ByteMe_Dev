import BottomBar from "../components/BottomBar";
import { motion } from "framer-motion";
import { TutorCard } from "../components/TutorDashboard/TutorCard";

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
    name: "Show Classes",
    link: "/tutordashboard/show",
  },
];

const classes = [1,2,3,4]

export const TutorDashboard = () => {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="px-6"
      >
        <h1
        className="text-3xl font-bold text-white my-auto text-start"
        >
            <span>
                <span className="text-teal-300">{"My "}</span>
            </span>
            Classes
        </h1>
        <div className="my-4 flex justify-between flex-wrap">
           {
                classes.map((_,i) => (
                     <div className="mx-4" key={i}>
                        <TutorCard />
                     </div>
                ))
           }

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
