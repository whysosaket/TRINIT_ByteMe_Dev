import { RxCross2 } from "react-icons/rx";
import { IoExitOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { motion } from "framer-motion";
import GlobalContext from "../Context/GlobalContext";
import { useContext } from "react";

const Sidebar = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(GlobalContext);
  return (
    <div>
      {/* component */}
      <div>
        <div
          style={{ zIndex: 100 }}
          className="flex h-screen antialiased text-white"
        >
          {/* Sidebar */}
          {isMenuOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2 }}
              x-transition:enter="transform transition-transform duration-300"
              x-transition:enter-start="-translate-x-full"
              x-transition:enter-end="translate-x-0"
              x-transition:leave="transform transition-transform duration-300"
              x-transition:leave-start="translate-x-0"
              x-transition:leave-end="-translate-x-full"
              x-show="isSidebarOpen"
              className="fixed inset-y-0 flex w-80"
              style={{ zIndex: 100 }}
            >
              {/* Curvy shape */}
              <svg
                className="absolute inset-0 w-full h-full text-white opacity-90"
                style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
                preserveAspectRatio="none"
                viewBox="0 0 309 800"
                fill="teal"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
              </svg>
              {/* Sidebar content */}
              <div style={{ zIndex: 100 }} className="flex flex-col flex-1">
                <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
                  {/* Logo */}

                  <h1 className="text-2xl font-bold">Norway</h1>

                  {/* Close btn */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 rounded-lg focus:outline-none "
                  >
                    <RxCross2 className="w-6 h-6" />
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
                <nav className="flex flex-col flex-1 w-64 p-4 mt-4">
                  <a
                    href="#"
                    className="flex items-center align-middle space-x-2"
                  >
                    <GoHome className="w-5 h-5" />
                    <span className="my-auto">Home</span>
                  </a>
                </nav>
                <div className="flex-shrink-0 p-4">
                  <button className="flex items-center space-x-2">
                    <IoExitOutline className="w-6 h-6" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
