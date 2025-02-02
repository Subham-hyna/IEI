import React from "react";
import './GalleryCard.css'
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download"; // Import the download icon
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";

const GalleryCard = ({ activity, deleteHandler }) => {
  const [open, setOpen] = React.useState(false);
  
  const { user } = useSelector(state => state.user);
    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="gallery-card">
      <img src={activity.image.url} alt={activity.title} onClick={handleOpen} />
      
      {/* Add download button next to the delete button */}
      {user && user.role === "admin" && (
        <div className="gallery-card-actions">
          <i onClick={deleteHandler}>
            <DeleteIcon />
          </i>
        </div>
      )}
      
      <div><a href={activity.image.url} download={activity.title} target="_blank" rel="noreferrer">
            <i>
              <DownloadIcon />
            </i>
          </a></div>
      <Modal open={open} onClose={handleClose}>
        <div className="gallery-card-modal">
          <img src={activity.image.url} alt={activity.title} />
        </div>
      </Modal>
    </div>
  );
};

export default GalleryCard;