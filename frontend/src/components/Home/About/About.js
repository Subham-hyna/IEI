import React from 'react'
import './About.css'
import logo from '../../../assets/IEI_logo.svg'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css'

const About = () => {
  return (
    <div className='about' id="about" >
        <div className='about-left'>
            <img  src={logo} alt='IEI_logo' />
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
          delay: 3000
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='about-swiper'
      >
                <div>
                  <SwiperSlide>
                <img src= "https://res.cloudinary.com/ddr1kuyb3/image/upload/v1704184396/aiony-haust-3TLl_97HNJo-unsplash_nolun5.jpg" alt='FIC' />
                <p>Faculty-In-Charge</p>
                </SwiperSlide>
                </div>
                <div>
                <SwiperSlide>
                <img src= "https://res.cloudinary.com/ddr1kuyb3/image/upload/v1704184396/aiony-haust-3TLl_97HNJo-unsplash_nolun5.jpg" alt='Pesident' />
                <p>President</p>
                </SwiperSlide>
                </div>
                <div>
                <SwiperSlide>
                <img src= "https://res.cloudinary.com/ddr1kuyb3/image/upload/v1704184396/aiony-haust-3TLl_97HNJo-unsplash_nolun5.jpg" alt='GS' />
                <p>General Secretary</p>
                </SwiperSlide>
                </div>
        </Swiper>
            </div> 
        </div>
        <div className='about-right'>
            <span>ABOUT US</span>
            <h1>IEI Students Chapter</h1>
            <h3>National Institute of Technology, Silchar</h3>
            <p>The IEI Students' Chapter at NIT Silchar is a thriving community of engineering students affiliated with the larger Institution of Engineers (India). Committed to fostering innovation, professional growth, and networking opportunities among its members, the chapter serves as a dynamic platform for student engineers. Through a variety of events such as seminars, workshops, guest lectures, and competitions, the chapter aims to provide a platform for students to enhance their technical knowledge and professional skills in various engineering fields.</p>
            <p>The purpose of the IEI Student Chapter at NIT Silchar is to facilitate the exchange of ideas and knowledge among its members. It creates a supportive environment where students can explore new concepts, work on projects, and connect with industry experts. The chapter's diverse activities, including industry visits, contribute to the holistic development of its members, guiding them to be not only technically proficient but also smart, ethical, and always ready to learn.</p>
        </div>
    </div>
  )
}

export default About