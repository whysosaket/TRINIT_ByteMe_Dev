import { motion } from "framer-motion";
import { EvervaultCard, Icon } from "../../ui/evervault-card";
import React, { useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import ClassroomContext from "../../Context/ClassroomContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface TutorCardProps {
  index: number;
  classroom: any;
}

const TutorCard: React.FunctionComponent<TutorCardProps> = ({
  index,
  classroom,
}) => {

  const { respondToSchedule } = useContext(ClassroomContext);
  const [status, setStatus] = useState(classroom.status);

  const getDate = (date: string) => {
    return new Date(date).toDateString();
  };

  const handleApprove = async () => {
    let res = respondToSchedule(classroom._id, "approved");
    if(res) setStatus("approved");
  }

  const handleReject = () => {
    let res = respondToSchedule(classroom._id, "rejected");
    if(res) setStatus("rejected");
  }


  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 * (index + 1) }}
      className="border bg-black/20 my-4 border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[28rem] w-[22rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={classroom.class.title} />

      <div className="w-full flex justify-between align-middle">
        <div>
          <h2 className="dark:text-white text-black mt-4 text-sm font-light">
            {classroom.duration + " Minutes"}
          </h2>
          <h2 className="dark:text-white text-black mt-2 text-sm font-light">
            {"$ " + classroom.price + " /- "}
          </h2>
        </div>
        <div className="my-auto">
         {status === 'approved' && <Link to="/tutorvideo" className="bg-teal-600 text-white px-4 py-1 rounded-lg hover:bg-teal-700">
            {"Join Now"}
          </Link>}
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div className="cursor-pointer text-sm border font-light mt-2 dark:border-white/[0.2] border-black/[0.2] rounded-full text-black dark:text-white px-2 py-0.5">
          {status}
        </div>
        <div>
          <p className="cursor-pointer text-sm border font-light mt-2 dark:border-white/[0.2] border-black/[0.2] rounded-full text-black dark:text-white px-2 py-0.5">
            {getDate(classroom.date)}
          </p>
        </div>
      </div>
      {status === "pending" && (
        <div className="w-full flex justify-between mt-4">
          <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 cursor-pointer flex align-middle">
            Approve <TiTickOutline className="my-auto" />
          </button>
          <button onClick={handleReject} className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 cursor-pointer flex align-middle">
            Reject <RxCross2 className="my-auto" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

const TutorCardSkeleton = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="border bg-black/20 my-4 border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[28rem] w-[22rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <div className="h-44 w-44  dark:bg-white/20 rounded-full animate-pulse mx-auto" />

      <div className="dark:text-white bg-white/20 mt-4 text-sm font-light h-8 w-full rounded-lg animate-pulse"></div>
      <div className="h-8 w-24 bg-black/20 dark:bg-white/20 rounded-full mt-4 animate-pulse" />
    </motion.div>
  );
};

export default TutorCard;
export { TutorCardSkeleton };
