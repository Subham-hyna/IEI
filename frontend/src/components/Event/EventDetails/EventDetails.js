import React, { useEffect } from 'react'
import './EventDetails.css'
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { clearErrors, clearMessages, deleteEventPhotos, getEventDetails } from '../../../redux/actions/eventAction';
import Loader from '../../utils/Loader/Loader';
import { deleteEventPhotoReset } from '../../../redux/reducers/eventReducer';
import MetaData from '../../Layout/MetaData';

const EventDetails = () => {

    const { user } = useSelector((state)=>state.user);
    const { loading , event, error, isDeleted } = useSelector((state)=>state.event);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const deleteHandler = (public_id) => {

        const token = localStorage.getItem("token");
        const formData = new FormData();
  
        formData.append("public_id",public_id);
        dispatch(deleteEventPhotos(formData,id,token));
    }

    useEffect(()=>{
        dispatch(getEventDetails(id));

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isDeleted){
            toast.success("Deleted");
            navigate(`/event/${id}`);
            dispatch(getEventDetails(id))
            dispatch(deleteEventPhotoReset());
            dispatch(clearMessages());
          }
    },[navigate,id,dispatch,error,isDeleted])

  return (
    <>
    { loading ?
    <Loader />
    :
    <div className='event-details'>
        {event && <MetaData title={`${event.title.toUpperCase()}`} />}
        <div className='event-details-upper'>
            <div className='back-btn'>
            <ArrowBackIcon onClick={() => navigate('/events')} style={{ color: '#7f51c2', cursor: 'pointer', fontSize:'2rem'}}/> 
            </div>
             <img src={event&&event.image.url} alt={event&&event.title} />
             <div>
             {event&&event.status !== "past" && <h3 className='blink'>{event&&event.status.toUpperCase()}</h3>}
             <h1>{event&&event.title}</h1>
             <textarea readOnly  >{event&&event.caption}</textarea>
             {event&&event.status === "upcoming" && 
             <div>
                <div>
                    <h4>Registration Link</h4>
                    <a href={event&&event.link} target='_'>{event.link}</a>
                </div>
                <div>
                    <h4>Last Date to apply</h4>
                    <p>{event&&event.date}</p>
                </div>
             </div>
             }
             </div>
        </div>
        <div className='event-details-lower'>
            <span>Event Photos</span>
            <div>
            { event&&event.photos.length > 0 ?
                event.photos.map((photo)=>(
                    <div>
                        <img src={photo.url} alt={event.title} />
                        {user&&user.role === "admin" && (
                            <i>
                        <DeleteIcon onClick={()=>deleteHandler(photo.public_id)} />
                        </i>
                        )}
                    </div>
                ))
            :
            <p>No Photos Available</p>}
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default EventDetails