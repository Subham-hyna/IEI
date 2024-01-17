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
            <p>The IEI Student Chapter at NIT Silchar orchestrated impactful events, commencing with a triumphant inauguration ceremony marked by dignitaries, speeches, and student gratitude. Republic Day saw a patriotic celebration at IEI Silchar local center, emphasizing engineers' roles. The 4th Foundation Day featured a presentation on renewable energy, fostering interaction and knowledge-sharing. A hands-on Arduino Workshop, held on April 3-4, equipped students with coding and robotics skills, guided by experienced instructors. The "IMPETUS" Placement Kickstart Session on April 10, 2023, provided valuable career insights. Engineers' Day was celebrated joyfully, featuring talks by Nirupam Choudhury and CDAC Director Mr. Jitesh Choudhary, encouraging insightful discussions and showcasing engineering excellence. On January 13, 2024, a Cybersecurity Workshop enhanced participants' awareness and skills in navigating the cyber landscape securely, contributing to the holistic development of the student community .</p>
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