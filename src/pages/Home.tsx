/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore: Suppress unused variable errors
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import AddingForm from "../blocks/AddingForm";

import Svg1 from "../assets/list-1.svg";
import Svg2 from "../assets/list-2.svg";
import Svg3 from "../assets/list-3.svg";
import Svg4 from "../assets/list-4.svg";
import Svg5 from "../assets/list-5.svg";
import Svg6 from "../assets/list-6.svg";
import Illustration1 from "/illustration_1.svg";

const svgList = [Svg1, Svg2, Svg3, Svg4, Svg5, Svg6];

const Home = () => {
  const [displayedSvgList, setDisplayedSvgList] = useState<string[]>([]);
  const updateDisplayedSvgList = () => {
    const isMobile = window.innerWidth < 769;
    setDisplayedSvgList(isMobile ? svgList.slice(0, 2) : svgList);
  };

  useEffect(() => {
    // Initial check on component mount
    updateDisplayedSvgList();

    // Update on window resize
    window.addEventListener("resize", updateDisplayedSvgList);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDisplayedSvgList);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>add.it</title>
      </Helmet>

      <section className="home-hero">
        <div className="wrapper">
          <div className="home-hero_box">
            <div className="home-hero_content">
              <h1>One list, all voices</h1>
              <h3>Collaborate, create, conquer.</h3>
              <p>
                Create your dream grocery list with friends, plan the ultimate
                road trip, or build the best party playlist.
              </p>
              <p>The possibilities are endless.</p>
              <AddingForm />
            </div>
            <div className="home-hero_lists">
              {displayedSvgList.map((svg, index) => (
                <motion.img
                  key={svg}
                  src={svg}
                  alt={`svg-${index}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.3,
                    duration: 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-welcome">
        <div className="wrapper">
          <div className="home-welcome_box">
            <div className="home-welcome_content">
              <h2>Make lists. Share. Enjoy.</h2>
              <p>
                Whether you're planning groceries, preparing for a trip or
                organizing a party, this app ensures you never miss a thing.
              </p>
              <p>
                Customizable items
                <span>
                  Add details like quantities and check off completed tasks.
                </span>
              </p>
              <p>
                Real-Time updates
                <span>
                  Collaborate with friends, family or coworkers. Changes are
                  updated instantly for everyone.
                </span>
              </p>
              <p>
                Access anywhere
                <span>
                  Use the app on any device, anytime — at home or on the go.
                </span>
              </p>
            </div>
            <img src={Illustration1} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
