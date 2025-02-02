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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { 
  TextField, 
  Button, 
  CircularProgress, 
} from "@mui/material";


const Team = () => {
  const [year, setYear] = useState("24");
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

    const token = localStorage.getItem("token")
    const formData = new FormData();

    formData.append("name",name);
    formData.append("post",post);
    formData.append("year",memberYear);
    formData.append("FY",fy);
    formData.append("insta",instalink);
    formData.append("facebook",fblink);
    formData.append("linkedIn",linkedInlink);
    formData.append("photo",image);

    dispatch(createMember(formData,token));

  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state)=>state.user);

  const { loading, fourthYears, thirdYears, secondYears, fic, error, isDeleted, message, isCreated, buttonLoading } = useSelector(state=>state.team);

  const deleteHandler = (id) => {
    const token = localStorage.getItem("token")
    dispatch(deleteTeam(id,token));
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
       < div className="team-heading">
        <h1>Team<span>Unity, Vision, Impact, Success</span></h1></div>
        { user && user.role === "admin" &&<button onClick={handleOpen}>Add Member</button>}
        <Modal open={open} onClose={handleClose}>
  <div className="add-member-container">
    <h2>Add New Team Member</h2>
    <form className="add-member-form" onSubmit={newTeamHandler}>
      
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <TextField
        label="Post"
        variant="outlined"
        fullWidth
        value={post}
        onChange={(e) => setPost(e.target.value)}
        required
      />

      <FormControl fullWidth>
        <InputLabel>Member Year</InputLabel>
        <Select value={memberYear} onChange={(e) => setMemberYear(e.target.value)} required>
          <MenuItem value="1">1st</MenuItem>
          <MenuItem value="2">2nd</MenuItem>
          <MenuItem value="3">3rd</MenuItem>
          <MenuItem value="4">4th</MenuItem>
          <MenuItem value="5">FIC</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Financial Year</InputLabel>
        <Select value={fy} onChange={(e) => setFy(e.target.value)} required>
          <MenuItem value="22">2022-23</MenuItem>
          <MenuItem value="23">2023-24</MenuItem>
          <MenuItem value="24">2024-25</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Facebook Link"
        variant="outlined"
        fullWidth
        value={fblink}
        onChange={(e) => setFblink(e.target.value)}
      />

      <TextField
        label="Instagram Link"
        variant="outlined"
        fullWidth
        value={instalink}
        onChange={(e) => setInsta(e.target.value)}
      />

      <TextField
        label="LinkedIn Link"
        variant="outlined"
        fullWidth
        value={linkedInlink}
        onChange={(e) => setLinkedIn(e.target.value)}
      />

      <Button variant="contained" component="label">
        Upload Profile Photo
        <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </Button>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {buttonLoading ? <CircularProgress size={24} /> : "Add Member"}
      </Button>

    </form>
  </div>
</Modal>

        <div className="year-dropdown">
            <FormControl>
              <InputLabel sx={{ color: "rgb(63 41 175)" , fontWeight : "500" , fontSize : "1.2rem"}} >Sort by Year</InputLabel>
              <Select
                sx={{ padding: "0 22px 0 5px" , fontWeight : "500"}}
                value={year}
                label="Sort by Year"
                onChange={(e)=>{setYear(e.target.value)}}
              >
                <MenuItem value="24">2024-25</MenuItem>
                <MenuItem value="23">2023-24</MenuItem>
                <MenuItem value="22">2022-23</MenuItem>
              </Select>
            </FormControl>
        </div>
      </div>
      <div className="t-lower">
  <div>
    <span className="style-heading">Faculties</span>
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      spaceBetween={20}
      grabCursor={true}
      breakpoints={{
        700: { slidesPerView: 2, spaceBetween: 10 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      autoplay={{ delay: 3000 }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="team-swiper"
    >
      {fic.length > 0 ? fic.map((f) => (
        <SwiperSlide key={f._id}>
          <Tilt>
            <TeamCard member={f} deleteHandler={() => deleteHandler(f._id)} />
          </Tilt>
        </SwiperSlide>
      )) : <p>No Members</p>}
    </Swiper>
  </div>

  <div>
    <span className="style-heading">4<sup>th</sup> Year Members</span>
    <Swiper
    centeredSlides={true}
      slidesPerView={1}
      loop={true}
      spaceBetween={20}
      grabCursor={true}
      breakpoints={{
        700: { slidesPerView: 2, spaceBetween: 10 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      autoplay={{ delay: 3000 }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="team-swiper"
    >
      {fourthYears.length > 0 ? fourthYears.map((f) => (
        <SwiperSlide key={f._id}>
          <Tilt>
            <TeamCard member={f} deleteHandler={() => deleteHandler(f._id)} />
          </Tilt>
        </SwiperSlide>
      )) : <p>No Members</p>}
    </Swiper>
  </div>

  <div>
    <span className="style-heading">3<sup>rd</sup> Year Members</span>
    <Swiper
    centeredSlides={true}
      slidesPerView={1}
      loop={true}
      spaceBetween={20}
      grabCursor={true}
      breakpoints={{
        700: { slidesPerView: 2, spaceBetween: 10 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      autoplay={{ delay: 3000 }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="team-swiper"
    >
      {thirdYears.length > 0 ? thirdYears.map((f) => (
        <SwiperSlide key={f._id}>
          <Tilt>
            <TeamCard member={f} deleteHandler={() => deleteHandler(f._id)} />
          </Tilt>
        </SwiperSlide>
      )) : <p>No Members</p>}
    </Swiper>
  </div>

  <div>
    <span className="style-heading">2<sup>nd</sup> Year Members</span>
    <Swiper
    centeredSlides={true}
      slidesPerView={1}
      loop={true}
      spaceBetween={20}
      grabCursor={true}
      breakpoints={{
        700: { slidesPerView: 2, spaceBetween: 10 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      autoplay={{ delay: 3000 }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="team-swiper"
    >
      {secondYears.length > 0 ? secondYears.map((f) => (
        <SwiperSlide key={f._id}>
          <Tilt>
            <TeamCard member={f} deleteHandler={() => deleteHandler(f._id)} />
          </Tilt>
        </SwiperSlide>
      )) : <p>No Members</p>}
    </Swiper>
  </div>
</div>

    </div>
    }
    </>
  );
};

export default Team;
