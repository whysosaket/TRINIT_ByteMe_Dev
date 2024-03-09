import {motion} from "framer-motion";
import { EvervaultCard, Icon } from "../../ui/evervault-card";
import React from "react";

interface TutorCardProps {
  index: number;
  classroom: any;
}

const TutorCard: React.FunctionComponent<TutorCardProps> = ({index, classroom}) => {
  return (
    <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.2 * (index+1) }}
    className="border bg-black/20 my-4 border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[28rem] w-[22rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={classroom.title} />

      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        {classroom.description}
      </h2>
      <h2 className="dark:text-white text-black mt-2 text-sm font-light">
        {classroom.language}
      </h2>

        <div className="flex">{
        classroom.price.map((p:any, i:number) => (
          <div key={i} className="flex flex-col mx-2 justify-between bg-teal-600 px-4 py-2 my-4 rounded-2xl text-xs">
            <p className="text-neutral-300">${" "+p+" "}</p>
            <p className="text-neutral-300">{" "+classroom.duration[i]} Minutes</p>
          </div>
        ))}
        </div>

      <p className="cursor-pointer text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-0 text-black dark:text-white px-2 py-0.5">
        View Bookings
      </p>
    </motion.div>
  );
}

const TutorCardSkeleton = () => {
  return (
    <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="border bg-black/20 my-4 border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[28rem] w-[22rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <div className="h-44 w-44  dark:bg-white/20 rounded-full animate-pulse mx-auto" />

      <div className="dark:text-white bg-white/20 mt-4 text-sm font-light h-8 w-full rounded-lg animate-pulse">

      </div>
      <div className="h-8 w-24 bg-black/20 dark:bg-white/20 rounded-full mt-4 animate-pulse" />
    </motion.div>
  );
}

export default TutorCard;
export { TutorCardSkeleton };
