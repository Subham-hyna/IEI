import React from "react";
import { motion } from "framer-motion";
import "./MerchCard.css";

const MerchCard = ({
  frontImage,
  backImage,
  name,
  description,
  orderLink,
  price,
}) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <motion.img
          src={frontImage}
          alt={`${name} front`}
          className="card-image front"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0 }}
        />
        <motion.img
          src={backImage}
          alt={`${name} back`}
          className="card-image back"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-footer">
        <span className="card-price">₹{price}</span>
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="order-button">
          Order Now
        </a>
      </div>
    </div>
  );
};

export default MerchCard;

// Usage example:
// <MerchCard
//   frontImage="/path-to-front-image.jpg"
//   backImage="/path-to-back-image.jpg"
//   name="Cool T-Shirt"
//   description="A stylish t-shirt for all occasions."
//   price={499}
//   orderLink="https://example.com/order"
// />
