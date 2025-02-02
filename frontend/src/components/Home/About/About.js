import React from "react";
import "./About.css";
import logo from "../../../assets/IEI_logo.svg";
import nit from "../../../assets/nit.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

const About = () => {
  return (
    <div className="about" id="about">
      <div className="about-left">
        <div className="nitxiei">
          <img src={logo} alt="IEI_logo" width={300} className="logo" />
          <img src={nit} alt="NIT_Silchar" width={300} className="nit" />
        </div>
        <div>
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={200}
            grabCursor={true}
            breakpoints={{
              700: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1250: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            autoplay={{
              delay: 3000,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="about-swiper">
            <div>
              <SwiperSlide>
                <img
                  src="https://res.cloudinary.com/dsntngid4/image/upload/v1737809404/rajib-sir_hkgm8c.jpg"
                  alt="FIC"
                />
                <p>Faculty-In-Charge<br></br>Dr. Rajeeb Dey</p>
              </SwiperSlide>
            </div>
            <div>
              <SwiperSlide>
                <img
                  src="https://res.cloudinary.com/dsntngid4/image/upload/v1738342870/shreya-didi_l5efqv.jpg"
                  alt="Pesident"
                />
                <p>President<br></br>Shreya Goswami</p>
              </SwiperSlide>
            </div>
            <div>
              <SwiperSlide>
                <img
                  src="https://res.cloudinary.com/dsntngid4/image/upload/v1738341043/gyan_bhaiya_rupgal.jpg"
                  alt="GS"
                />
                <p>General Secretary<br></br>Gyan S. Hazarika</p>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
      <div className="about-right">
        <span>ABOUT US</span>
        <h1>IEI Student Chapter</h1>
        <h3>National Institute of Technology, Silchar</h3>
        <p>
          The IEI Student Chapter at NIT Silchar is a vibrant community of engineering students affiliated with the Institution of Engineers (India). Committed to fostering innovation, professional growth, and networking opportunities, the chapter serves as a dynamic platform for budding engineers. Through seminars, workshops, guest lectures, and competitions, it strives to enrich students' technical knowledge and sharpen their professional skills across diverse engineering disciplines.
        </p>
        <p>
        The chapter’s core purpose is to promote the exchange of ideas and knowledge among its members. It cultivates a collaborative environment where students can explore emerging concepts, engage in hands-on projects, and connect with industry leaders. With activities ranging from technical sessions to industry visits, the chapter ensures the holistic development of its members, shaping them into technically proficient, ethical, and future-ready professionals.
        </p>
        <p>
        The chapter is guided by its esteemed faculty in-charge, Dr. Rajeeb Dey, an Associate Professor in the Electrical Engineering Department at NIT Silchar. Dr. Dey has made significant contributions to the field of biomedical engineering and has represented the institute as a keynote speaker at numerous workshops and events. His expertise and mentorship play a pivotal role in shaping the chapter's initiatives and inspiring students to excel in their academic and professional pursuits.
        </p>
      </div>
    </div>
  );
};

export default About;
