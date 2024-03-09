import BottomBar from "../components/BottomBar"
import Hero from "../components/home/Hero";
import { Hero2 } from "../components/home/Hero2"
import { useState, useEffect } from "react";
import { Hero3 } from "../components/home/Hero3";

const bottomBarItems = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "Login",
    link: "/login"
  },
  {
    name: "Signup",
    link: "/signup"
  }
];

const Home = () => {
  const [unMountHero, setUnMountHero] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUnMountHero(true);
    }, 5000);
  }, []);
  return (
    <>
      <div>
        {!unMountHero && <Hero />}
        {unMountHero && <Hero2 />}
        {unMountHero && <Hero3 />}
      </div>
      <BottomBar items={bottomBarItems}  />
    </>
  );
};

export default Home