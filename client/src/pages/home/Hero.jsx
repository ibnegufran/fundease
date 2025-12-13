import React from "react";
// import img from "./src/public/images/hero.png";
const Hero = () => {
  return (
    <section className="w-full md:h-[90vh] bg-white  py-20 md:pb-0 px-6">
      <div className="max-w-6xl mx-auto h-full flex flex-col-reverse md:flex-row items-center gap-10 md:justify-between">
        
        {/* Left Text */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            FundEase – Simplifying College Payments
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            A transparent, easy-to-use platform for managing event payments,
            fund submissions, and admin approvals.
          </p>

          <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:opacity-90">
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="../images/hero3.png"
            alt="FundEase Hero"
            className=" w-full rounded-full hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
