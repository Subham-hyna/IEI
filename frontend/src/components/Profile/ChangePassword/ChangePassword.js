import React, { useEffect, useState } from 'react'
import './ChangePassword.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { clearErrors, updatePassword } from '../../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import MetaData from '../../Layout/MetaData';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword , setOldPassword] = useState("");
  const [newPassword , setNewPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");

  const { error, user, loading } = useSelector((state)=>state.user);

  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("oldPassword",oldPassword);
    formData.append("newPassword",newPassword);
    formData.append("confirmPassword",confirmPassword);

    dispatch(updatePassword(formData));

  }

  useEffect(()=>{
    if(user){
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

  },[dispatch,error,user])

  return (
    <div className='change-password'>
      <MetaData title="Change Password" />
      <form onSubmit={updateHandler}>
        <div>
          <label>Old Password</label>
          <input type='password' value={oldPassword} placeholder='Enter Your Old Password' onChange={(e)=>{setOldPassword(e.target.value)}} />
        </div>
        <div>
          <label>New Password</label>
          <input type={showPassword ? "text" : "password"} value={newPassword} placeholder='Enter Your New Password' onChange={(e)=>{setNewPassword(e.target.value)}} />
          <div
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>

        </div>
        <div>
          <label>Confirm Password</label>
          <input type='password' value={confirmPassword} placeholder='Confirm Your Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} />
        </div>
        <div>
          <button 
          type='submit'
          >{loading ? <div className='button-loader'></div> : "Update"}</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword