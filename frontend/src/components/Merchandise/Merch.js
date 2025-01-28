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
      <h1 className="page-title">IEI x INTERSTELLAR</h1>
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
