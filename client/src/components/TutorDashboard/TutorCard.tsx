import React from "react";
import { EvervaultCard, Icon } from "../../ui/evervault-card";

export function TutorCard() {
  return (
    <div className="border my-4 border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[20rem] w-[16rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text="English" />

      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        I teach English Here
      </h2>
      <p className="cursor-pointer text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        View Bookings
      </p>
    </div>
  );
}
