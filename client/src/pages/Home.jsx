import React from "react";
import Hero from "../components/Hero";
import BuildBox from "../components/BuildBox";
import WonderWithRaafest from "../components/WonderWithRaafest";

const Home = () => {
  return (
    <div className="py-20 ">
      <Hero />
      <BuildBox />
      <WonderWithRaafest />
    </div>
  );
};

export default Home;
