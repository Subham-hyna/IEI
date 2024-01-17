import React, { useEffect, useState } from 'react'
import './Newsletter.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessages, subscribeLetter } from '../../../redux/actions/mailAction';
import {toast} from 'react-hot-toast';
import { subscribeReset } from '../../../redux/reducers/mailReducer';

const Newsletter = () => {
  const [email, setEmail] = useState();
  const { loading , message, error, isSubscribe} = useSelector(state=>state.mail);
  const dispatch = useDispatch();

  const subscribeHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email",email);
    dispatch(subscribeLetter(formData))
    setEmail("");
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    if(isSubscribe){
      toast.success(message);
      dispatch(clearMessages());
      dispatch(subscribeReset())
    }
  },[dispatch,isSubscribe,error,message])
  return (
    <div className='news-outer'>
        <div className='news-inner'>
            <h1>Be the first to <span>know</span></h1>
            <h2>We will just give you the <span>right</span> amount of knowledge</h2>
            <h2>Sign up for our <span>Weekly Newsletter</span> and be the first to know about special</h2>
            <h3>no spams, we promise</h3>
            <div className='news-messagebox'>
                <h3>Subscribe Here!</h3>
                <form>
                    <input 
                    type='email'
                    placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <button type='submit' onClick={subscribeHandler}>{loading ? <div className='button-loader'></div> : "Subscribe"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Newsletter