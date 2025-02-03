import React from "react";
import "./Home.css";
import Button from "@mui/material/Button";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import IC from "../../assets/IC_pic.png";
import { motion } from "framer-motion";
import Newsletter from "./Newsletter/Newsletter";
import About from "./About/About";
import Activities from "./Activities/Activities";
import MetaData from "../Layout/MetaData";
import ScrollLink from "../utils/ScrollLink";
const Home = () => {
  const options = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <section>
      <MetaData title="IEI NIT SILCHAR" />
      <div className="home">
        <div className="h-title">
          <motion.h1
            initial={{
              y: "+100%",
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}>
            THE INSTITUTION OF ENGINEERS(INDIA)
          </motion.h1>
        </div>
        <div className="h-content">
          <motion.h4
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}>
            National Institute of Technology, Silchar Student Chapter
          </motion.h4>
          <motion.p
            initial={{
              y: "-100%",
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.4,
            }}>
            Welcome to the Institute of Engineers India! Enrich yourselves with
            knowledge, diverse disciplines, and a vibrant community of
            professionals. Join us on a journey of innovation, collaboration,
            and continuous learning to elevate your engineering prowess with our
            world-class resources and networking opportunities. Indulge in
            cutting edge activities and hands on projects to level up your
            engineering skills. Whether you're a seasoned engineer or a budding
            enthusiast, our website is your gateway to enormous information,
            events, and opportunities that will guide you towards your
            engineering journey. Welcome to a digital space where engineering
            excellence thrives. Explore, engage, and elevate your engineering
            journey with us.
          </motion.p>
        </div>
        <div className="h-arrow">
          <ScrollLink to="/" targetId="about" className="h-arrow">
            <ArrowDownwardOutlinedIcon
              sx={{ color: "#6846f8", fontSize: "60px" }}
            />
          </ScrollLink>
        </div>
        <motion.img
          whileInView={{
            opacity: 0.5,
          }}
          src={IC}
          className="h-icon"
        />
      </div>
      <About />
      <Activities />
      <Newsletter />
    </section>
  );
};

export default Home;
