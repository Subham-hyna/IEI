import React, { useEffect } from 'react'
import './Activities.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getEvents } from '../../../redux/actions/eventAction';
import toast from 'react-hot-toast';

const Activities = () => {
    
  const { error, events } = useSelector((state)=>state.event);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getEvents("",1,"upcoming"));
  },[dispatch])

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
  },[dispatch,error])

  const upcomingEventts = events.slice(0,3);
  return (
    <div className='activity'>
            <h1>EVENTS</h1>
            <div>
            <p>The IEI Student Chapter at NIT Silchar began its journey with a memorable inauguration ceremony in its first year, setting the stage for a series of impactful events.  Engineers' Day was celebrated with insightful talks by Nirupam Choudhury and CDAC Director Mr. Jitesh Choudhary, sparking engaging discussions on engineering excellence. The "IMPETUS" Placement Kickstart Session provided valuable career insights to help students prepare for their professional journeys.</p>
<p>
Over the years, the chapter has organized a variety of workshops and competitions, including a Cybersecurity Workshop that enhanced participants' skills in navigating the digital landscape securely. The Drone Workshop and Matlab OnRamp Party offered immersive experiences in cutting-edge technologies. Regular Arduino Workshops have played a key role, equipping students with coding and robotics skills, and challenging them with exciting Arduino-based competitions.
</p>
<p>
2025 kicked off with the DataStorm Climate Analysis Challenge, inspiring students to dive into environmental issues and explore data-driven solutions. And with even more thrilling events in the pipeline, the IEI Student Chapter is set to continue its tradition of innovation, learning, and excitement for years to come!</p>
            <div>
            {events.length > 0 &&
                    upcomingEventts.map((event)=>(
                       <span>
                            <div>NEW</div>
                            <Link to={`/event/${event._id}`} >{event.title}</Link>
                        </span>
                    ))
                    
            } 
            </div>
            </div>
            <Link to={`/events`} ><button>Explore More</button></Link>
    </div>
  )
}

export default Activities