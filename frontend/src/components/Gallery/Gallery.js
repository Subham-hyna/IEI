import React, { useEffect, useState } from "react";
import "./Gallery.css";
import { Modal, Pagination } from "@mui/material";
import GalleryCard from "./GalleryCard/GalleryCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../utils/Loader/Loader'
import { clearErrors, clearMessages, createActivity, deleteActivity, getActivity } from "../../redux/actions/galleryAction";
import {toast} from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { deleteActivityReset, newActivityReset } from "../../redux/reducers/galleryReducer";

const Gallery = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState();
  const [image, setImage] = useState("");

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

const {
    activities,
    loading,
    error,
    resultPerPage,
    activitiesFilteredCount,
    message,
    isDeleted,
    isCreated,
    buttonLoading
  } = useSelector((state) => state.gallery);

  const { user } = useSelector((state)=>state.user);

  const newActivityHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title",title);
    formData.append("photo",image);
    dispatch(createActivity(formData));
    setTitle("");
    setImage("");
  };

  const handleSearch = () => {
    if(search.length > 0){
      navigate(`/gallery/${search.trim()}`)
    }
    else{
      navigate("/gallery")
    }
  }

  const deleteHandler = (id) => {
    dispatch(deleteActivity(id));
  }

  const { keyword } = useParams();

  useEffect(()=>{
    dispatch(getActivity(keyword,page))
  },[dispatch,page,keyword])

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    if(isDeleted){
      toast.success(message);
      navigate("/gallery");
      dispatch(getActivity());
      dispatch(deleteActivityReset());
      dispatch(clearMessages());
    }

    if(isCreated){
      toast.success(message);
      navigate("/gallery");
      handleClose();
      dispatch(getActivity());
      dispatch(newActivityReset());
      dispatch(clearMessages());
    }
    
  },[dispatch,error,isDeleted,message,navigate,isCreated])

  return (
    <>
    {loading ? 
     <Loader />
     :
     <div className="gallery">
      <MetaData title="GALLERY" />
      <h1>GALLERY</h1>
      <p>
        Explore the achievements and milestones IEI student chapter NIT Silchar
        has achieved.
      </p>
        {user&&user.role === "admin" && (
          <i>
            <button onClick={handleOpen}>Add Photo</button>
          </i>
        )}
      <form>
        <input
          type="text"
          value={search}
          placeholder="Search for Events"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} >Go</button>
        <Modal open={open} onClose={handleClose}>
          <form className="add-member">
            <div>
              <label>Title</label>
              <div>
                <input
                  type="text"
                  value={title}
                  placeholder="Enter tags"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>Choose Profile Photo</label>
              <div>
                <input type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div>
              <button onClick={newActivityHandler} >{buttonLoading ? <div className='button-loader'></div> : "Upload"}</button>
            </div>
          </form>
        </Modal>
      </form>
      <span className="activities">
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <GalleryCard activity={activity} deleteHandler={()=>deleteHandler(activity._id)} />
          ))
        ) : (
          <p>No such Events</p>
        )}
      </span>
      <span>
        {activitiesFilteredCount > resultPerPage && (
          <Pagination
            count={Math.ceil(activitiesFilteredCount / resultPerPage)}
            page={page}
            onChange={onPageChange}
            color="secondary"
            size="medium"
          />
        )}
      </span>
    </div>
    }
    </>
  );
};

export default Gallery;
