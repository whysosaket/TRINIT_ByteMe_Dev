import { motion } from "framer-motion";
import BottomBar from "../components/BottomBar";
import TutorCard, {
  TutorCardSkeleton,
} from "../components/TutorDashboard/TutorCard";
import { useState, useEffect, useContext, useRef } from "react";
import "../styles/studentDaashboard.css";
import { FaSearch } from "react-icons/fa";
import StudentTopBar from "../components/studentDashboard/StudentTopBar";
import SearchContext  from "../Context/SearchContext";

const bottomBarItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Search",
    link: "/studentdashboard/",
  },
  {
    name: "Show Classes",
    link: "/tutordashboard/show",
  },
];

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);

  const { searchClasses, setSearch, classes } = useContext(SearchContext);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await searchClasses("", 0, 0);
      setLoading(false);
    };
    fetchClasses();
  }, []);

  const handleSearch = async () => {
    setSearch(searchRef.current?.value);
    setLoading(true);
    await searchClasses(searchRef.current?.value, 0, 0);
    setLoading(false);
  }



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
            <span className="text-teal-300">{"My Scheduled "}</span>
          </span>
          Classes
        </h1>
        <div className="w-full flex justify-end">
          <div>
            <StudentTopBar />
          </div>
          <div className="search-box">
            <button className="btn-search">
              {/* <i className="fas fa-search" /> */}
              <FaSearch className="mx-auto" />
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
              ref={searchRef}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="my-4 h-[33rem] no-scrollbar overflow-y-scroll flex justify-between flex-wrap">
            <TutorCardSkeleton />
            <TutorCardSkeleton />
            <TutorCardSkeleton />
          </div>
        ) : (
          <div
            className={`my-4 h-[33rem] no-scrollbar overflow-y-scroll flex ${
              classes.length > 2 ? "justify-between" : "justify-start"
            } flex-wrap`}
          >
            {classes.map((classroom: any, i: number) => (
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
        Student
        <span className="text-teal-300">{" Dashboard "}</span>
      </motion.h1>
      <BottomBar items={bottomBarItems} />
    </>
  );
};

export default StudentDashboard;
