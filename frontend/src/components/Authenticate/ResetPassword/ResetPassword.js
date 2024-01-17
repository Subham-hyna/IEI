import React, { useEffect, useState } from 'react'
import './ResetPassword.css'
import { clearErrors, resetPassword } from '../../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { resetPasswordReset } from '../../../redux/reducers/userReducer';
import MetaData from '../../Layout/MetaData';

const ResetPassword = () => {
    const [password , setPassword] = useState();
    const [confirmPassword , setConfirmPassword] = useState();

    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, success, loading } = useSelector((state) => state.user);

    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.append("password", password);
      myForm.append("confirmPassword", confirmPassword);
      console.log(token);
  
      dispatch(resetPassword(token, myForm));
    };

    useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }

      if(success){
        toast.success("Password Updated Successfully");
        navigate("/login")
        dispatch(resetPasswordReset());
      }
    },[dispatch,error,loading,success,navigate])

  return (
    <div className='reset-password'>
      <MetaData title="Reset Password" />
    <form onSubmit={resetPasswordSubmit} >
    <div>
       <label>New Password</label>
       <input type='password' placeholder='New Password'  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
   </div>
    <div>
       <label>Confirm Password</label>
       <input type='password' placeholder='Confirm Password'  value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
   </div>
   <div>
    <button type='submit' >{loading ? <div className='button-loader'></div> : "Update"}</button>
   </div>
    </form>
</div>
  )
}

export default ResetPassword