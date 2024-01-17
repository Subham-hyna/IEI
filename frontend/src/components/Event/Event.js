import React, { useEffect, useState } from 'react'
import './Event.css'
import EventCard from './EventCard/EventCard'
import { FormControl, InputLabel, MenuItem, Modal, Pagination, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, clearMessages, createEvent, deleteEvent, getEvents } from '../../redux/actions/eventAction'
import {toast} from 'react-hot-toast'
import { deleteEventReset, newEventReset } from '../../redux/reducers/eventReducer'
import Loader from '../utils/Loader/Loader'
import MetaData from '../Layout/MetaData'

const Event = () => {
    const [status , setStatus] = useState("ALL");
    const [search , setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [title , setTitle] = useState();
    const [caption , setcaption] = useState();
    const [link , setLink] = useState();
    const [date , setDate] = useState();
    const [addStatus , setAddStatus] = useState();
    const [image, setImage] = useState("");
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onPageChange = (event, value) => {
        setPage(value);
    };

    const newEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title",title);
        formData.append("caption",caption);
        formData.append("link",link);
        formData.append("status",addStatus);
        formData.append("date",date);
        formData.append("photo",image);
    
        dispatch(createEvent(formData));
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        events,
        loading,
        error,
        resultPerPage,
        eventsFilteredCount,
        message,
        isDeleted,
        isCreated,
        buttonLoading
    } = useSelector((state) => state.event);
    const { user } = useSelector((state)=>state.user);

    const handleSearch = () => {
        if(search.length > 0){
          navigate(`/events/${search.trim()}`)
        }
        else{
          navigate("/events")
        }
      }
    
      const deleteHandler = (id) => {
        dispatch(deleteEvent(id));
      }
    
      const { keyword } = useParams();
    
      useEffect(()=>{
        status === "ALL" ? dispatch(getEvents(keyword,page,"")) : dispatch(getEvents(keyword,page,status));
      },[dispatch,page,keyword,status])
    
      useEffect(()=>{
        if(error){
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if(isDeleted){
          toast.success(message);
          navigate("/events");
          status === "ALL" ? dispatch(getEvents(keyword,page,"")) : dispatch(getEvents(keyword,page,status));
          dispatch(deleteEventReset());
          dispatch(clearMessages());
        }

        if(isCreated){
          toast.success(message);
          navigate("/events");
          handleClose();
          status === "ALL" ? dispatch(getEvents(keyword,page,"")) : dispatch(getEvents(keyword,page,status));
          dispatch(newEventReset());
          dispatch(clearMessages());
        }
        
      },[dispatch,error,isDeleted,message,navigate,keyword,page,status,isCreated])

  return (
    <>
    {loading ?
    <Loader />
    :
    <div className='event'>
        <MetaData title={`${status.toUpperCase()} EVENTS`} />
        <div className='event-upper'>
            <h1>Innovate, Learn, Create Together</h1>
            <div>
            <FormControl>
              <InputLabel sx={{ color: "rgb(63 41 175)" , fontWeight : "500" , fontSize : "1.1rem"}} >Status</InputLabel>
              <Select
                sx={{ padding: "0 22px 0 5px" , fontWeight : "500"}}
                value={status}
                label="Status"
                onChange={(e)=>{setStatus(e.target.value)}}
              >
                      <MenuItem value="ALL">ALL</MenuItem>
                      <MenuItem value="upcoming">UPCOMING</MenuItem>
                      <MenuItem value="ongoing">ONGOING</MenuItem>
                      <MenuItem value="past">PAST</MenuItem>
                 </Select>
                </FormControl>
            </div>
            <form onSubmit={handleSearch}>
                 <input
                     type="text"
                     value={search}
                     placeholder="Search for Events"
                     onChange={(e) => setSearch(e.target.value)}
                 />
                 <button type='submit' >Go</button>
             </form>
             { user&&user.role === "admin" &&<button onClick={handleOpen}>Add Event</button>}
        <Modal
        open={open}
        onClose={handleClose}
      >
        <form className='add-member'>
      <div>
      <label>Title</label>
      <div>
          <input type='text' value={title} placeholder='Enter Event Title' onChange={(e)=>(setTitle(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>Caption</label>
      <div>
          <textarea value={caption} placeholder='Enter Event Caption' onChange={(e)=>(setcaption(e.target.value))}>{caption}</textarea>
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
      </div>
      </div>
      <div>
      <label>Last Date to apply</label>
      <div>
          <input type='text' value={date} placeholder='Enter Last Date to apply' onChange={(e)=>(setDate(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>Registration Link</label>
      <div>
          <input type='text' value={link} placeholder='Enter Registration link' onChange={(e)=>(setLink(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>Choose Poster Image</label>
      <div>
          <input type='file'
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} />
      </div>
      </div>
      <div>
          <button type='submit' onClick={newEventHandler} >{buttonLoading ? <div className='button-loader'></div> : "ADD"}</button>
      </div>
    </form>
      </Modal>
        </div>
        <div className='event-lower'>
            <h1>{status.toUpperCase()} EVENTS</h1>
            <div>
                {events.length > 0 ? 
                events.map((event)=>(
                    <EventCard event={event} key={event._id} status={status} deleteHandler={()=>deleteHandler(event._id)} />
                ))    
                :
                <p>No Events Found!!</p>
            }
            </div>
            {eventsFilteredCount > resultPerPage && (
          <Pagination
            count={Math.ceil(eventsFilteredCount / resultPerPage)}
            page={page}
            onChange={onPageChange}
            color="secondary"
            size="large"
          />
        )}
        </div>
    </div>
    }
    </>
  )
}

export default Event