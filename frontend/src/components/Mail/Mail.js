import React, { useEffect, useState } from 'react'
import './Mail.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, clearMessages, sendLetters } from '../../redux/actions/mailAction';
import {toast} from 'react-hot-toast';

const Mail = () => {
    const [ title, setTitle ] = useState();
    const [ style, setStyle ] = useState();
    const [ body, setBody ] = useState();

    const { loading , error, message } = useSelector(state=>state.mail);
    const dispatch = useDispatch();

    const sendMailHandler = () => {
      const formData = new FormData();

      formData.append("title",title);
      formData.append("style",style);
      formData.append("body",body);

      dispatch(sendLetters(formData));
    }

    useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
  
      if(message){
        toast.success(message);
        dispatch(clearMessages());
      }
    },[dispatch,error,message])

  return (
    <div className='mail'>
    <form>
    <div>
       <label>Title</label>
       <input type='text' placeholder='Title' onChange={(e)=>setTitle(e.target.value)} />
   </div>
    <div>
       <label>CSS Style</label>
       <textarea placeholder='CSS' onChange={(e)=>setStyle(e.target.value)} ></textarea>
   </div>
    <div>
       <label>HTML</label>
       <textarea placeholder='HTML' onChange={(e)=>setBody(e.target.value)} ></textarea>
   </div>
   <div>
    <button type='submit' onClick={sendMailHandler} >{loading ? <div className='button-loader'></div> : "Send"}</button>
   </div>
    </form>
</div>
  )
}

export default Mail