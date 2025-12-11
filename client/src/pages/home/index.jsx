import React from "react";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Events from "./Events";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="font-sans bg-secondary min-h-screen">
      <Hero />
      <div className="pt-20 scroll-smooth transition-all" id="features">
      <Features />
      </div>
      <HowItWorks />
      <Events />
    </div>
  );
};

export default Home;
