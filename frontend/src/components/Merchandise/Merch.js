import React, { useState } from "react";
import MerchCard from "./MerchCard/MerchCard.js";
import "./Merch.css";
import MetaData from "../Layout/MetaData";

const Merch = () => {
  const [popupItem, setPopupItem] = useState(null);

  const merchItems = [
    {
      frontImage:
        "https://res.cloudinary.com/dsntngid4/image/upload/v1737877439/tshirt-front_atczoy.jpg",
      backImage:
        "https://res.cloudinary.com/dsntngid4/image/upload/v1737877439/tshirt-back_hkn7ju.jpg",
      name: "IEI-Tee",
      description: "The IEI T-Shirt based on Interstellar theme.",
      price: 599,
      orderLink: "https://example.com/order-shirt",
    },
    {
      frontImage:
        "https://res.cloudinary.com/dsntngid4/image/upload/v1737877377/hoodie-front_lnkvbo.jpg",
      backImage:
        "https://res.cloudinary.com/dsntngid4/image/upload/v1737877377/hoodie-back_nvmvsu.jpg",
      name: "IEI-Hoodie",
      description:
        "The IEI Hoodie based on Interstellar theme. Stay warm and stylish!",
      price: 899,
      orderLink: "https://example.com/order-hoodie",
    },
    {
      frontImage:
        "https://res.cloudinary.com/dsntngid4/image/upload/v1737877378/sweatshirt-front_dqbyf4.jpg",
      backImage:
        "https://res.cloudinary.com/dsntngid4/image/upload/v1737877377/sweatshirt-back_c2jmd6.jpg",
      name: "IEI-Sweatshirt",
      description: "The IEI Sweatshirt based on Interstellar theme.",
      price: 749,
      orderLink: "https://example.com/order-sweatshirt",
    },
  ];

  const handleCardClick = (item) => {
    setPopupItem(item);
  };

  const closePopup = () => {
    setPopupItem(null);
  };

  return (
    <div className="merch-page">
      <MetaData title={`MERCHANDISE`} />
      <h1 className="page-title">Merchandise</h1>

<p className="merch-description">
  Discover our exclusive <span className="highlight">Interstellar-inspired&nbsp;</span> 
  merchandise collection! Designed for explorers and dreamers, these 
  limited-edition pieces bring the wonders of space to your wardrobe. 
  Elevate your style and embrace the cosmic adventure! <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 16L12 14V10L13.6569 8.34314C15.1571 6.84285 16 4.80802 16 2.68629V0H13.3137C11.192 0 9.15714 0.842855 7.65685 2.34315L6 4H2L0 6L10 16ZM10.5 7C11.3284 7 12 6.32843 12 5.5C12 4.67157 11.3284 4 10.5 4C9.67157 4 9 4.67157 9 5.5C9 6.32843 9.67157 7 10.5 7Z" fill="#7854f8bd"></path> <path d="M4.9274 13.7558L2.24423 11.0726L0 15L1 16L4.9274 13.7558Z" fill="#7854f8bd"></path> </g></svg>
  <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.9456 2.84731C18.3542 2.14979 19.0585 1.80104 19.5345 2.11769C20.0104 2.43435 19.9427 3.20671 19.8074 4.75143L19.7724 5.15106C19.7339 5.59003 19.7147 5.80951 19.7834 6.00845C19.852 6.2074 20.0008 6.36329 20.2984 6.67507L20.5694 6.95892C21.6166 8.05609 22.1402 8.60468 21.9676 9.16677C21.795 9.72887 21.0405 9.93221 19.5315 10.3389L19.1411 10.4441C18.7123 10.5597 18.4979 10.6175 18.3269 10.7517C18.156 10.8859 18.0478 11.0814 17.8314 11.4723L17.6344 11.8281C16.873 13.2038 16.4924 13.8916 15.9098 13.9223C15.3272 13.953 14.9285 13.3063 14.1312 12.013L13.925 11.6784C13.6984 11.3108 13.5851 11.1271 13.4108 11.0111C13.2365 10.8951 13.0208 10.86 12.5895 10.7898L12.1968 10.7259C10.6791 10.4789 9.92016 10.3554 9.7327 9.81228C9.54524 9.26918 10.0534 8.66616 11.0696 7.46012L11.3325 7.14811C11.6213 6.80539 11.7657 6.63403 11.8289 6.42812C11.8921 6.22222 11.867 6.00508 11.8168 5.57079L11.7711 5.17542C11.5945 3.64716 11.5062 2.88303 11.9729 2.51664C12.4396 2.15025 13.1523 2.42425 14.5776 2.97224L14.9464 3.11402C15.3514 3.26974 15.554 3.3476 15.7674 3.33634C15.9808 3.32508 16.1809 3.22598 16.5812 3.02776L16.9456 2.84731Z" fill="#7854f8bd"></path> <g opacity="0.5"> <path d="M9.04452 11.3203C5.99048 13.2697 3.27111 16.7967 2.0908 20.0321C1.70785 21.0818 2.59069 22.0006 3.71668 22.0006H4.75C4.75007 21.6498 4.83224 21.2139 4.95372 20.7564C5.07876 20.2855 5.25886 19.743 5.48334 19.1616C5.93221 17.9992 6.57058 16.6505 7.33621 15.3652C8.09909 14.0845 9.0062 12.8366 10.0012 11.8992C10.0258 11.876 10.0506 11.853 10.0754 11.83C10.052 11.8229 10.0289 11.8157 10.0062 11.8084C9.72191 11.7169 9.36664 11.5713 9.04452 11.3203Z" fill="#7854f8bd"></path> <path d="M12.0202 12.2173C11.7015 12.4123 11.3705 12.67 11.0298 12.991C10.1729 13.7983 9.34809 14.9188 8.62489 16.1329C7.90444 17.3423 7.30253 18.6146 6.88264 19.7019C6.67275 20.2455 6.51136 20.7351 6.40349 21.1413C6.29223 21.5604 6.25008 21.8464 6.25 22.0006H9.08304C9.08314 20.8766 9.47243 18.7949 10.1769 16.7088C10.6939 15.1781 11.4097 13.5555 12.3322 12.2681L12.0202 12.2173Z" fill="#7854f8bd"></path> <path d="M13.2982 13.5134C12.6225 14.5571 12.0472 15.8587 11.5981 17.1888C10.9202 19.1961 10.5832 21.1042 10.583 22.0006H11.8718C12.9978 22.0006 13.9043 21.0942 13.9793 19.9804C14.1081 18.0663 14.4036 16.3411 14.7411 15.1142C14.407 14.918 14.1488 14.6602 13.9589 14.4372C13.7399 14.1801 13.5196 13.859 13.2982 13.5134Z" fill="#7854f8bd"></path> </g> </g></svg>
</p>
      <div className="merch-grid">
        {merchItems.map((item, index) => (
          <div
            key={index}
            className="clickable-card"
            onClick={() => handleCardClick(item)}>
            <div className="card-content-wrapper">
              <MerchCard
                frontImage={item.frontImage}
                backImage={item.backImage}
                name={item.name}
                description={item.description}
                price={item.price}
                orderLink={item.orderLink}
              />
            </div>
          </div>
        ))}
      </div>
      {popupItem && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              ✕
            </button>
            <h2>{popupItem.name}</h2>
            <p>{popupItem.description}</p>
            <p className="popup-price">Price: ₹{popupItem.price}</p>
            <div className="popup-images">
              <div className="zoomable-container">
                <div className="image-label">Front</div>
                <img
                  src={popupItem.frontImage}
                  alt={`${popupItem.name} front`}
                  className="zoomable-image"
                />
              </div>
              <div className="zoomable-container">
                <div className="image-label">Back</div>
                <img
                  src={popupItem.backImage}
                  alt={`${popupItem.name} back`}
                  className="zoomable-image"
                />
              </div>
            </div>
            <a
              href={popupItem.orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="order-button">
              Order Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Merch;
