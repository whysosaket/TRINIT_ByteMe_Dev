import BottomBar from "../components/BottomBar";
import { motion } from "framer-motion";
import TutorCard, {
  TutorCardSkeleton,
} from "../components/TutorDashboard/TutorCard";
import { useState, useContext, useEffect } from "react";
import ClassroomContext from "../Context/ClassroomContext";

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

export const TutorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  const {getMyClasses} = useContext(ClassroomContext);

  useEffect(() => {
    const fetchClasses = async () => {
      const classes = await getMyClasses();
      setClasses(classes);
      if(classes.length>0)
      setLoading(false);
    }
    fetchClasses();
  }, []);

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
            <span className="text-teal-300">{"My "}</span>
          </span>
          Classes
        </h1>
        {loading ? (
          <div className="my-4 h-[33rem] no-scrollbar overflow-y-scroll flex justify-between flex-wrap">
            <TutorCardSkeleton />
            <TutorCardSkeleton />
            <TutorCardSkeleton />
          </div>
        ) : (
          <div className={`my-4 h-[33rem] no-scrollbar overflow-y-scroll flex ${classes.length>2?"justify-between":"justify-start"} flex-wrap`}>
            {classes.map((classroom:any, i) => (
              <div className="mx-4" key={i}>
                <TutorCard index={i} classroom={classroom} />
              </div>
            ))}
          </div>
        )}
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
