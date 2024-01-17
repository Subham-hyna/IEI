import React, { useEffect, useState } from 'react'
import './PasswordForgot.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessages, forgotPassword } from '../../../redux/actions/userAction';
import {toast} from 'react-hot-toast';
import MetaData from '../../Layout/MetaData';

const PasswordForgot = () => {
    const [email , setEmail] = useState();

    const dispatch = useDispatch();

    const {error ,loading, message} = useSelector((state)=>state.user);

    const submitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email",email);

      dispatch(forgotPassword(formData));
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
    },[dispatch,error,loading,message])

  return (
    <div className='password-forgot'>
      <MetaData title="Forgot Password" />
         <form onSubmit={submitHandler}>
            <label>Get Verification Link</label>
            <input type='email' placeholder='Email'  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <button type='submit' >{loading ? <div className='button-loader'></div> : "Get Link"}</button>
        </form>
    </div>
  )
}

export default PasswordForgot