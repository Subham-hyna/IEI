import React from "react";
import './GalleryCard.css'
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";

const GalleryCard = ({ activity , deleteHandler }) => {
  const [open, setOpen] = React.useState(false);
  
  const { user } = useSelector(state=>state.user);
    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="gallery-card">
      <img src={activity.image.url} alt={activity.title} onClick={handleOpen} />
      {user&&user.role === "admin" && (
        <i onClick={deleteHandler}>
          <DeleteIcon />
        </i>
      )}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="gallery-card-modal">
        <img src={activity.image.url} alt={activity.title} />
        </div>
      </Modal>
    </div>
  );
};

export default GalleryCard;
