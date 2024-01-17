import React, { useEffect, useState } from 'react'
import './EventCard.css'
import { Link, useNavigate } from 'react-router-dom'
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addEventPhoto, clearErrors, getEvents, updateEvent, updateEventPoster } from '../../../redux/actions/eventAction';
import { addEventPhotoReset, updateEventReset } from '../../../redux/reducers/eventReducer';

const EventCard = ({event,  status, deleteHandler}) => {
    const [open, setOpen] = React.useState(false);
    const [title , setTitle] = useState(event.title);
    const [caption , setcaption] = useState(event.caption);
    const [link , setLink] = useState(event.link);
    const [date , setDate] = useState(event.date);
    const [addStatus , setAddStatus] = useState(event.status);
    const [poster, setPoster] = useState("")
    const [photo, setPhoto] = useState("")
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useSelector((state)=>state.user);
    const { buttonLoading, isUpdated, error, isCreated } = useSelector((state)=>state.event);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updatePosterHandler = (id) => {
      
      const formData = new FormData();
  
      formData.append("photo",poster);
  
      dispatch(updateEventPoster(formData,id));
    }

    const addPhotoHandler = (id) => {
      
      const formData = new FormData();
  
      formData.append("photo",photo);
  
      dispatch(addEventPhoto(formData,id));
    }

    const updateHandler = (id) => {
    
      const formData = new FormData();
  
      formData.append("title",title);
      formData.append("caption",caption);
      formData.append("link",link);
      formData.append("status",addStatus);
      formData.append("date",date);
  
      dispatch(updateEvent(formData,id));
    }

    useEffect(() => {

      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }

    if(isUpdated){
      handleClose();
      status === "ALL" ? dispatch(getEvents("",1,"")) : dispatch(getEvents("",1,status));
      dispatch(updateEventReset());
    }
    if(isCreated){
      handleClose();
      status === "ALL" ? dispatch(getEvents("",1,"")) : dispatch(getEvents("",1,status));
      dispatch(addEventPhotoReset());
    }
    }, [dispatch,isUpdated,error,navigate,status,isCreated])

  return (
    <div className='event-card'>
        <Link to = {`/event/${event._id}`} >
            <img src={event.image.url} alt={event.title.substr(0,6)} />
        </Link>
        <div>
            {event.status !== "past" && <h3 className='blink'>{event.status.toUpperCase()}</h3>}
            <h1>{event.title}</h1>
            <h2>{event.date}</h2>
            <textarea>{event.caption.substr(0,150)+"..."}</textarea>
            <Link to = {`/event/${event._id}`}>Click here to view more</Link>
        </div>
        { user&&user.role === "admin" && <span>
            <button onClick={handleOpen}>Edit</button>
            <Modal
        open={open}
        onClose={handleClose}
      >
        <div className='edit-member'>
      <div>
      <label>Title</label>
      <div>
          <input type='text' value={title} placeholder='Enter Event Title' onChange={(e)=>(setTitle(e.target.value))}/>
          <button onClick={()=>updateHandler(event._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Caption</label>
      <div>
          <textarea value={caption} placeholder='Enter Event Caption' onChange={(e)=>(setcaption(e.target.value))}>{caption}</textarea>
          <button onClick={()=>updateHandler(event._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Status</label>
      <div>
          <select value={addStatus} onChange={(e)=>(setAddStatus(e.target.value))}>
            <option value="" >Set Status of the Event</option>
            <option value="upcoming" >UPCOMING</option>
            <option value="ongoing" >ONGOING </option>
            <option value="past" >PAST</option>
          </select>
          <button onClick={()=>updateHandler(event._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Last Date to apply</label>
      <div>
          <input type='text' value={date} placeholder='Enter Last Date to apply' onChange={(e)=>(setDate(e.target.value))}/>
          <button onClick={()=>updateHandler(event._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Registration Link</label>
      <div>
          <input type='text' value={link} placeholder='Enter Registration link' onChange={(e)=>(setLink(e.target.value))}/>
          <button onClick={()=>updateHandler(event._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Choose Poster Image</label>
      <div>
          <input type='file'
            accept="image/*"
            onChange={(e) => setPoster(e.target.files[0])} />
          <button onClick={()=>updatePosterHandler(event._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Add Event Photo</label>
      <div>
          <input type='file'  
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])} />
          <button onClick={()=>addPhotoHandler(event._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
    </div>
      </Modal>
            <button onClick={deleteHandler}>Delete</button>
            </span>}
    </div>
  )
}

export default EventCard