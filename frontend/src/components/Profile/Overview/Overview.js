import React, { useEffect, useState } from 'react'
import './Overview.css'
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateAvatar } from '../../../redux/actions/userAction';
import {toast} from 'react-hot-toast';
import { updateAvatarReset } from '../../../redux/reducers/userReducer';

const Overview = () => {
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const { user,error,loading, isUpdated  } = useSelector((state)=>state.user)

    const updateHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("photo",avatar);

        dispatch(updateAvatar(formData));
        setAvatar("");
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            toast.success("Updated");
            dispatch(updateAvatarReset());
        }
    },[dispatch,error,isUpdated]);

  return (
    <div className='overview'>
        <div className='o-left'>
            <div>
                <p>Name</p>
                <span>{user && user.name}</span>
            </div>
            <div>
                <p>Email</p>
                <span>{user && user.email}</span>
            </div>
            <div>
                <p>Phone</p>
                <span>{user && user.phone}</span>
            </div>
            <div>
                <p>{user && user.scholarId && "Scholar ID"}</p>
                <span>{user && user.scholarId && user.scholarId }</span>
            </div>
            <div>
                <p>{user && user.year && "Year of Passing"}</p>
                <span>{user && user.year && user.year }</span>
            </div>
            <div>
                <p>{user && user.department && "Department"}</p>
                <span>{user && user.department && user.department}</span>
            </div>
            <div>
                <p>{user && user.semester && "Semester"}</p>
                <span>{user && user.semester && user.semester}</span>
            </div>
            <div>
                <p>{user && user.institute && "Institute"}</p>
                <span>{user && user.institute && user.institute}</span>
            </div>
            <div>
                <p>Joined On</p>
                <span>{user && user.createdAt.substr(0, 10) }</span>
            </div>
        </div>
        <div className='o-right'>
            <img src={user && user.avatar.url} alt='profile_pic' />
            <button onClick={handleOpen}>Edit Profile Pic</button>
            <Modal
        open={open}
        onClose={handleClose}
      >
        <div className='profile-modal'>
        <label>Choose Profile Photo</label>
        <input type='file'
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
        />
        <button onClick={updateHandler}>{loading ? <div className='button-loader'></div> : "Update Avatar"}</button>
        </div>
      </Modal>
        </div>
    </div>
  )
}

export default Overview