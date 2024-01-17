import React, { useEffect, useState } from 'react'
import './DeleteAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { clearErrors, clearMessages, deleteMe } from '../../../redux/actions/userAction';
import { deleteUserReset } from '../../../redux/reducers/userReducer';
import MetaData from '../../Layout/MetaData';

const DeleteAccount = () => {

  const [password, setPassword] = useState();

  const { loading, isDeleted ,error, message } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = () => {

    dispatch(deleteMe(password));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    if(isDeleted){
      toast.success(message);
      navigate("/");
      dispatch(clearMessages());
      dispatch(deleteUserReset());
    }
  },[dispatch,isDeleted,error,navigate,message])

  return (
    <div className='delete-account'>
      <MetaData title="Delete Account" />
      <span><p>To Delete Your Account,</p> <span> Please Enter the your password</span></span>
      <input type='password' placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={deleteHandler} >{loading ? <div className='button-loader'></div> : "Delete"}</button>
    </div>
  )
}

export default DeleteAccount