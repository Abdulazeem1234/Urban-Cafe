import React, { useState } from 'react';

const Cart = ({ cart, total, deliveryCharge, onRemove, onUpdateQuantity, onPlaceOrder, onClose }) => {
  const grandTotal = total + deliveryCharge;
  
  // Customer information state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    mobile: '',
    address: ''
  });
  
  // Handle customer info change
  const handleInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };
  
  // Validate mobile number (10 digits)
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };
  
  // Handle place order with customer info
  const handlePlaceOrder = () => {
    if (!customerInfo.name) {
      alert('Please enter your name.');
      return;
    }
    
    if (!customerInfo.mobile) {
      alert('Please enter your mobile number.');
      return;
    }
    
    if (!validateMobile(customerInfo.mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    
    if (!customerInfo.address) {
      alert('Please enter your delivery address.');
      return;
    }
    
    if (cart.length > 0) {
      onPlaceOrder(customerInfo);
      // Reset customer info form after successful order placement
      setCustomerInfo({
        name: '',
        mobile: '',
        address: ''
      });
    }
  };
  
  return (
    <div className="cart-overlay">
      <div className="cart-section">
        <div className="container">
          <div className="cart-header">
            <h2 className="section-title">Your Order</h2>
            <button className="close-cart" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="cart-content">
            <div className="cart-items" id="cart-items">
              {cart.length === 0 ? (
                <p id="empty-cart-message">Your cart is empty. Add some delicious items!</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => onRemove(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Delivery:</span>
                <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge.toFixed(2)}`}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              
              {/* Customer Information Form */}
              <div className="customer-info">
                <h3>Customer Information</h3>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  value={customerInfo.name}
                  onChange={handleInfoChange}
                  required
                />
                <input 
                  type="tel" 
                  name="mobile" 
                  placeholder="Mobile Number" 
                  value={customerInfo.mobile}
                  onChange={handleInfoChange}
                  required
                />
                <textarea 
                  name="address" 
                  placeholder="Delivery Address" 
                  rows="3"
                  value={customerInfo.address}
                  onChange={handleInfoChange}
                  required
                ></textarea>
              </div>
              
              <button 
                id="place-order-btn" 
                className="btn"
                disabled={cart.length === 0}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
