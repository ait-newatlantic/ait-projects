import React, { useState } from "react";

import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
} from "../InfoSection/Data";

import Navbar from "../Navbar/Navbar";
import Sidebar2 from "../Sidebar2/Sidebar2";
import HeroSection from "../HeroSection/HeroSection";
import InfoSection from "../InfoSection";
import Services from "../Services/Services";
import Footer from "../Footer/Footer";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Sidebar2 isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection/>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Services />
      <InfoSection {...homeObjThree} />
      <Footer />
    </>
  );
}

export default Home;
