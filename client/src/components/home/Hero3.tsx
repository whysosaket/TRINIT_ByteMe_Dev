import { motion } from "framer-motion";
import Claim from "./Claim";
import GoBack from "./GoBack";
import { AnimatedPinDemo } from "./AnimatedPinDemo";
import { MultiStepLoaderDemo } from "./MultiStepLoaderDemo";
import { useState } from "react";

let animationProps = {
  initial: { x: 700, rotateY: -180, scale: 1.5 },
  animate: { x: 0, rotateY: 0, scale: 1, transition: { duration: 1 } },
};

export function Hero3() {
  const handleGotoTop = () => {
    window.scrollTo(0, 0);
  };

  const [showFeatures, setShowFeatures] = useState(true);

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures);
  };

  return (
    <motion.div
      id="hero3"
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0 }}
      className="h-screen w-full bg-black/40 flex flex-col items-center justify-center overflow-hidden rounded-md"
    >
      <div className="w-full flex flex-col md:flex-row justify-center">
        <motion.div {...animationProps} className="w-1/2 z-50">
          {showFeatures ? (
            <div className="cursor-pointer" onClick={toggleFeatures}>
              <AnimatedPinDemo />
            </div>
          ) : (
            <div className="cursor-pointer" onClick={toggleFeatures}>
                <h1 className="text-center text-3xl font-semibold">
                    <span className="text-teal-300 ml-1">{"Features"}</span>
                </h1>
              <MultiStepLoaderDemo />
            </div>
          )}
        </motion.div>
        <div className="w-1/2 px-8 flex flex-col justify-center align-middle">
          <div className="my-auto">
            <div className="">
              <h1 className="text-5xl font-bold text-white my-auto">
                Learn
                <span className="text-teal-300">{" Evolve "}</span>
                Improve
              </h1>
              <h1>
                <span className="text-teal-300 ml-1">{"with "}</span>
                <span className="text-white">{"us"}</span>
              </h1>
              <h1 className="text-sm ml-1 my-2 font-semibold text-teal-600">
                Hello. We are here to help. Consider us your friend.
                </h1>
            </div>
            <div className="flex mt-8">
              <motion.div
                onClick={handleGotoTop}
                initial={{ x: -500, rotateY: 180, scale: 1.5 }}
                animate={{
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                  transition: { duration: 1, delay: 0.9 },
                }}
              >
                <GoBack />
              </motion.div>
              <motion.div
                initial={{ x: -500, rotateY: 180, scale: 1.5 }}
                animate={{
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                  transition: { duration: 1, delay: 0.8 },
                }}
              >
                <Claim />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
