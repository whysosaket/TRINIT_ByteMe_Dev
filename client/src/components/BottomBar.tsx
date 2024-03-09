import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";
 
const itemClass = "text-xl font-light mx-12 cursor-pointer hover:text-primary my-auto tracking-[4px]";

interface BottomBarItem {
  name: string;
  link: string;
}

interface BottomBarProps {
  items?: BottomBarItem[];
}

const BottomBar:React.FunctionComponent<BottomBarProps> = ({items}) => {
  return (
    <motion.nav
    initial={{ y: 70, opacity: 0}}
    animate={{ y: 0, opacity: 1}}
    transition={{ duration: 0.8}}
    style={{zIndex: 80}}
    className="fixed bottom-0 flex w-full justify-start align-middle h-20 ">
        <div style={{zIndex: 80}} className="flex justify-start items-center p-4 my-auto select-none">
            <FaChevronLeft className="text-2xl" />
            <FaChevronRight className="text-2xl" />
        </div>
        <div style={{zIndex: 80}} className="flex justify-start items-center my-auto align-middle">
            {
              items?.map((item, index) => (
                <Link style={{zIndex: 80}} to={item.link} key={index} className={itemClass}>{item.name}</Link>
              ))
            }
        </div>
    </motion.nav>
  )
}

export default BottomBar