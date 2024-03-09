import { CgMenuGridR } from "react-icons/cg";
import { motion } from "framer-motion";
import GlobalContext from "../Context/GlobalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { appName, tutorNavLinks, studentNavLinks } from "../data";

const itemClass =
  "text-xl font-light mx-4 cursor-pointer hover:text-primary my-auto tracking-[4px]";

const Navbar = () => {
  const { setIsMenuOpen } = useContext(GlobalContext);
  const { isUser, isAuthenticated, logout } = useContext(AuthContext);
  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{ zIndex: 80 }}
      className="flex w-full justify-between align-middle h-20 z-50"
    >
      <div className="flex justify-start items-center p-4 w-1/3 my-auto z-50">
        <CgMenuGridR
          onClick={() => setIsMenuOpen(true)}
          className="text-4xl hover:text-primary cursor-pointer z-50"
        />
        <h1 className="text-2xl font-semibold ml-6 cursor-pointer z-50 ">
          {appName}
        </h1>
      </div>
      <div
        className="flex justify-between items-center w-1/3 my-auto align-middle"
        style={{ zIndex: 80 }}
      >
        {isUser
          ? studentNavLinks.map((link, index) => (
            !isAuthenticated && link.title === "Dashboard" ? null : (
              <Link to={link.path} key={index} className={itemClass}>
                {link.title}
              </Link>)
            ))
          : tutorNavLinks.map((link, index) => (
            !isAuthenticated && link.title === "Dashboard" ? null : (
              <Link to={link.path} key={index} className={itemClass}>
                {link.title}
              </Link>)
            ))}
      </div>
      <div
        className="flex justify-end items-center w-1/3 my-auto"
        style={{ zIndex: 80 }}
      >
        {isAuthenticated ? (
          <h1 onClick={logout} className={itemClass}>
            Logout
          </h1>
        ) : (
          <Link to="/login" className={itemClass}>
            Login
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
