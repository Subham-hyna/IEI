import React, { useEffect, useState } from 'react'
import './TeamCard.css'
import insta from '../../../assets/insta_blackwhite.png'
import facebook from '../../../assets/facebook_blackwhite.png'
import linkedIn from '../../../assets/linkedin_blackwhite.png'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getTeam, updateTeam, updateTeamAvatar } from '../../../redux/actions/teamAction'
import { updateTeamReset } from '../../../redux/reducers/teamReducer'
import {toast} from 'react-hot-toast'

const TeamCard = ({ member, deleteHandler }) => {
    const [open, setOpen] = useState(false);
    const [name , setName] = useState(member.name);
    const [post , setPost] = useState(member.post);
    const [memberYear , setMemberYear] = useState(member.year);
    const [fy , setFy] = useState(member.FY);
    const [fblink , setFblink] = useState(member.facebook);
    const [instalink , setInsta] = useState(member.insta);
    const [linkedInlink , setLinkedIn] = useState(member.linkedIn);
    const [avatar, setAvatar] = useState("");
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { user } = useSelector((state)=>state.user);
    const { buttonLoading, isUpdated, error } = useSelector((state)=>state.team);

    const updateHandler = (id) => {
    
      const formData = new FormData();
  
      formData.append("name",name);
      formData.append("post",post);
      formData.append("year",memberYear);
      formData.append("FY",fy);
      formData.append("insta",instalink);
      formData.append("facebook",fblink);
      formData.append("linkedIn",linkedInlink);
  
      dispatch(updateTeam(formData,id));
    }

    const updateAvatarHandler = (id) => {
    
      const formData = new FormData();
  
      formData.append("photo",avatar);
  
      dispatch(updateTeamAvatar(formData,id));
    }

    useEffect(() => {

      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }

    if(isUpdated){
      handleClose();
      dispatch(getTeam(member.FY));
      dispatch(updateTeamReset());
    }
    }, [dispatch,isUpdated,member.FY,error])
    

  return (
    <div className='team-card'>
        <img src={member.avatar.url} alt='member_pic' />
        <h1>{member.name}</h1>
        <h2>{member.post}</h2>
        <div>
            <a href={member.facebook}><img src={facebook} alt='fb_logo' /></a>
            <a href={member.linkedIn}><img src={linkedIn} alt='fb_logo' /></a>
            <a href={member.insta}><img src={insta} alt='fb_logo' /></a>
        </div>
        { user&&user.role === "admin" && <span>
            <button onClick={handleOpen}>Edit</button>
            <Modal
        open={open}
        onClose={handleClose}
      >
        <div className='edit-member'>
      <div>
      <label>Name</label>
      <div>
          <input type='text' value={name} placeholder='Enter Member Name' onChange={(e)=>(setName(e.target.value))}/>
          <button onClick={()=>updateHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Post</label>
      <div>
          <input type='text' value={post} placeholder='Enter Member Post' onChange={(e)=>(setPost(e.target.value))}/>
          <button onClick={()=>updateHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Member Year</label>
      <div>
          <select value={memberYear} onChange={(e)=>(setMemberYear(e.target.value))}>
            <option value="" >Set Member Year</option>
            <option value="2" >2nd</option>
            <option value="3" >3rd</option>
            <option value="4" >4th</option>
            <option value="5" >FIC</option>
          </select>
          <button onClick={()=>updateHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Financial Year</label>
      <div>
          <select value={fy} onChange={(e)=>(setFy(e.target.value))}>
            <option value="" >Set Financial Year</option>
            <option value="22" >2022-23</option>
            <option value="23" >2023-24 </option>
            <option value="24" >2024-25</option>
          </select>
          <button onClick={()=>updateHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Facebook Link</label>
      <div>
          <input type='text' value={fblink} placeholder='Enter Member facebook link' onChange={(e)=>(setFblink(e.target.value))}/>
          <button onClick={()=>updateHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Instagram Link</label>
      <div>
          <input type='text' value={instalink} placeholder='Enter Member insta link' onChange={(e)=>(setInsta(e.target.value))}/>
          <button onClick={()=>updateHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>LinkedIn Link</label>
      <div>
          <input type='text' value={linkedInlink} placeholder='Enter Member linkedIn link' onChange={(e)=>(setLinkedIn(e.target.value))}/>
          <button onClick={()=>updateHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Choose Profile Photo</label>
      <div>
          <input type='file'
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])} />
          <button onClick={()=>updateAvatarHandler(member._id)} >{buttonLoading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
    </div>
      </Modal>
            <button onClick={deleteHandler} >Delete</button>
            </span>}
    </div>
  )
}

export default TeamCard