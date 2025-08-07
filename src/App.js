import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OrderPopup from './components/OrderPopup';
import './styles.css';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate delivery charge (free within 1km)
  const deliveryCharge = 0; // Free delivery within 1km as per requirements
  
  // Place order with customer information
  const placeOrder = async (customerInfo) => {
    if (cart.length > 0) {
      // Send order email
      const emailSent = await sendOrderEmail(customerInfo);
      
      // Show popup regardless of email success
      setShowPopup(true);
      
      // Clear cart after placing order
      setCart([]);
      
      // Close cart to return to home page view
      setShowCart(false);
    }
  };
  
  // Send order email using EmailJS
  const sendOrderEmail = async (customerInfo) => {
    // Create order summary
    let orderSummary = "";
    cart.forEach(item => {
      orderSummary += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Email parameters
    const templateParams = {
      to_email: 'zubbi216@gmail.com',
      from_name: customerInfo.name,
      from_mobile: customerInfo.mobile,
      from_address: customerInfo.address,
      order_details: orderSummary,
      total_amount: total
    };
    
    // Log the email parameters for debugging
    console.log('Email template parameters:', templateParams);
    
    try {
      // Send email using EmailJS
      // IMPORTANT: You need to replace these placeholder values with your actual EmailJS credentials
      const result = await emailjs.send(
        'YOUR_ACTUAL_SERVICE_ID',     // Replace with your Service ID
        'YOUR_ACTUAL_TEMPLATE_ID',    // Replace with your Template ID
        templateParams,
        'YOUR_ACTUAL_USER_ID'         // Replace with your User ID
      );
      
      console.log('Email sent successfully!', result.text);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };
  
  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };
  
  return (
    <div className="App">
      <Header 
        cartCount={cart.reduce((count, item) => count + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />
      
      <main>
        <Hero />
        <Menu onAddToCart={addToCart} />
        {showCart && (
          <Cart 
            cart={cart}
            total={cartTotal}
            deliveryCharge={deliveryCharge}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onPlaceOrder={placeOrder}
            onClose={() => setShowCart(false)}
          />
        )}
        <About />
        <Contact />
        <Footer />
        
        <OrderPopup 
          show={showPopup}
          onClose={closePopup}
        /> 
      </main>
    </div>
  );
}

export default App;
