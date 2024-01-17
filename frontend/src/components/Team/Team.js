import React, { useEffect, useState } from "react";
import "./Team.css";
import TeamCard from "./TeamCard/TeamCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tilt from 'react-parallax-tilt'
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader/Loader";
import { clearErrors, clearMessages, createMember, deleteTeam, getTeam } from "../../redux/actions/teamAction";
import {toast} from "react-hot-toast";
import { deleteTeamReset, newTeamReset } from "../../redux/reducers/teamReducer";
import MetaData from "../Layout/MetaData";

const Team = () => {
  const [year, setYear] = useState("23");
  const [open, setOpen] = useState(false);
  const [name , setName] = useState();
  const [post , setPost] = useState();
  const [memberYear , setMemberYear] = useState();
  const [fy , setFy] = useState();
  const [fblink , setFblink] = useState();
  const [instalink , setInsta] = useState();
  const [linkedInlink , setLinkedIn] = useState();
  const [image, setImage] = useState("");
    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newTeamHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name",name);
    formData.append("post",post);
    formData.append("year",memberYear);
    formData.append("FY",fy);
    formData.append("insta",instalink);
    formData.append("facebook",fblink);
    formData.append("linkedIn",linkedInlink);
    formData.append("photo",image);

    dispatch(createMember(formData));

  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state)=>state.user);

  const { loading, fourthYears, thirdYears, secondYears, fic, error, isDeleted, message, isCreated, buttonLoading } = useSelector(state=>state.team);

  const deleteHandler = (id) => {
    dispatch(deleteTeam(id));
  }

  useEffect(()=>{
    dispatch(getTeam(year))
  },[dispatch,year])

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    if(isDeleted){
      toast.success(message);
      navigate("/team");
      dispatch(getTeam(year));
      dispatch(deleteTeamReset());
      dispatch(clearMessages());
    }

    if(isCreated){
      toast.success(message);
      navigate("/team");
      handleClose();
      dispatch(getTeam(year));
      dispatch(newTeamReset());
      dispatch(clearMessages());
    }
    
  },[dispatch,error,isDeleted,message,navigate,year,isCreated])

  const nextYear = parseInt(year)+1;

  return (
    <>
    {loading ? <Loader />
    :
    <div className="team">
      <MetaData title={`IEI TEAM - 20${year}-${nextYear}`} />
      <div className="t-upper">
        <span>Unity, Vision, Impact, Success</span>
        { user && user.role === "admin" &&<button onClick={handleOpen}>Add Member</button>}
        <Modal
        open={open}
        onClose={handleClose}
      >
        <form className='add-member'>
      <div>
      <label>Name</label>
      <div>
          <input type='text' value={name} placeholder='Enter Member Name' onChange={(e)=>(setName(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>Post</label>
      <div>
          <input type='text' value={post} placeholder='Enter Member Post' onChange={(e)=>(setPost(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>Member Year</label>
      <div>
          <select value={memberYear} onChange={(e)=>(setMemberYear(e.target.value))}>
            <option value="" >Set Member Year</option>
            <option value="1" >1st</option>
            <option value="2" >2nd</option>
            <option value="3" >3rd</option>
            <option value="4" >4th</option>
            <option value="5" >FIC</option>
          </select>
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
      </div>
      </div>
      <div>
      <label>Facebook Link</label>
      <div>
          <input type='text' value={fblink} placeholder='Enter Member facebook link' onChange={(e)=>(setFblink(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>Instagram Link</label>
      <div>
          <input type='text' value={instalink} placeholder='Enter Member insta link' onChange={(e)=>(setInsta(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>LinkedIn Link</label>
      <div>
          <input type='text' value={linkedInlink} placeholder='Enter Member linkedIn link' onChange={(e)=>(setLinkedIn(e.target.value))}/>
      </div>
      </div>
      <div>
      <label>Choose Profile Photo</label>
      <div>
          <input type='file' 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
      </div>
      </div>
      <div>
          <button type='submit' onClick={newTeamHandler} >{buttonLoading ? <div className='button-loader'></div> : "ADD"}</button>
      </div>
    </form>
      </Modal>
        <div>
            <FormControl>
              <InputLabel sx={{ color: "rgb(63 41 175)" , fontWeight : "500" , fontSize : "1.2rem"}} >Sort by Year</InputLabel>
              <Select
                sx={{ padding: "0 22px 0 5px" , fontWeight : "500"}}
                value={year}
                label="Sort by Year"
                onChange={(e)=>{setYear(e.target.value)}}
              >
                <MenuItem value="23">2023-24</MenuItem>
                <MenuItem value="22">2022-23</MenuItem>
              </Select>
            </FormControl>
        </div>
      </div>
      <div className="t-lower">
        <div>
          <span>Core Members</span>
          <div>
          {fic.length > 0 ?
            fic.map((f) => (
                <Tilt><TeamCard key={f._id} member={f} deleteHandler={()=>deleteHandler(f._id)} /></Tilt>
            ))
            :
            <p>No Members</p>}
          </div>
        </div>
        <div>
          <span>4th Year Members</span>
          <div>
          {fourthYears.length > 0 ?
            fourthYears.map((f) => (
              <Tilt><TeamCard key={f._id} member={f} deleteHandler={()=>deleteHandler(f._id)} /></Tilt>
            ))
          :
          <p>No Members</p>
          }
          </div>
        </div>
        <div>
          <span>3rd Year Members</span>
          <div>
          {thirdYears.length > 0 ?
            thirdYears.map((f) => (
              <Tilt><TeamCard key={f._id} member={f} deleteHandler={()=>deleteHandler(f._id)} /></Tilt>
            ))
            :
            <p>No Members</p>}
          </div>
        </div>
        <div>
          <span>2nd Year Members</span>
          <div>
          {secondYears.length > 0 ?
            secondYears.map((f) => (
              <Tilt><TeamCard key={f._id} member={f} deleteHandler={()=>deleteHandler(f._id)} /></Tilt>
            ))
            :
            <p>No Members</p>}
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default Team;
