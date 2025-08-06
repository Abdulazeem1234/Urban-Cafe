import React from 'react';

const OrderPopup = ({ message, isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }
  
  return (
    <div id="order-popup" className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Message Sent Successfully!</h2>
        <p>{message}</p>
        <button id="ok-btn" className="btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default OrderPopup;
