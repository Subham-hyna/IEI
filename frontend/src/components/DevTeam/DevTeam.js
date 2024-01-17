import React from 'react'
import './DevTeam.css'
import { seniorTeam, juniorTeam } from './DevTeamDetails'
import DeveloperCard from './DeveloperCard/DeveloperCard'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css'
import MetaData from '../Layout/MetaData'

const DevTeam = () => {
  return (
    <div className='developer'>
      <MetaData title="DEVELOPER TEAM" />
      <span><h1>Meet Our Developers</h1></span>
      <div className='developer-senior' >
      <span>
          <h2>Senior</h2>
          <p>team</p>
        </span>
      <div>
      <Swiper
        slidesPerView={1}
        loop={true}
        spaceBetween={200}
        grabCursor={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1250: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 5000
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {seniorTeam.map((member)=>(
          <SwiperSlide>
            <DeveloperCard details={member} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
        
      </div>
      <div className='developer-junior' >
      <div>
      <Swiper
        style={{"--swiper-navigation-color":"blueviolet"}}
        slidesPerView={1}
        loop={true}
        spaceBetween={200}
        grabCursor={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 80,
          },
          1250: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 200,
          },
        }}
        autoplay={{
          delay: 5000
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {juniorTeam.map((member)=>(
          <SwiperSlide>
            <DeveloperCard details={member} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      <span>
          <h2>Junior</h2>
          <p>team</p>
        </span>
      </div>
    </div>
  )
}

export default DevTeam