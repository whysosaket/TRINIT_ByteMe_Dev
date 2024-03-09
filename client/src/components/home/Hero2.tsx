import { RightHalf } from "./RightHalf";
import {motion} from "framer-motion";
import Typewriter from "./Typewriter";
import LearnMore from "./LearnMore";
import Claim from "./Claim";

let animationProps = {
  initial: { x: 700,rotateY: -180, scale: 1.5},
  animate: { x: 0,rotateY: 0, scale: 1, transition: { duration: 1 } },
};

export function Hero2() {
  return (
    <motion.div
    initial={{ y: -300, opacity: 0}}
    animate={{ y: 0, opacity: 1}}
    transition={{ duration: 1, delay: 0}}
    className="h-screen w-full -mt-20 bg-black/40 flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full flex flex-col md:flex-row justify-center">
        <div className="w-1/3 flex flex-col justify-center align-middle flex-wrap">
          <Typewriter />
          <div className="flex ">
          <motion.a
          initial={{ x: -500,rotateY: 180, scale: 1.5}}
          animate={{ x: 0,rotateY: 0, scale: 1, transition: { duration: 1, delay: 0.9 }}}
          href="#hero3"
          >
          <LearnMore />
          </motion.a>
          <motion.div
          initial={{ x: -500,rotateY: 180, scale: 1.5}}
          animate={{ x: 0,rotateY: 0, scale: 1, transition: { duration: 1, delay: 0.8 }}}
          >
          <Claim />
          </motion.div>
          </div>
        </div>
        <motion.div
        { ...animationProps}
        className="w-1/2 z-50 flex justify-end">
          <RightHalf />
        </motion.div>
      </div>
    </motion.div>
  );
}
