import React, { useState } from 'react';
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
      // Send order to backend server
      await sendOrderToServer(customerInfo);
      
      // Clear cart after placing order
      setCart([]);
      
      // Close cart to return to home page view
      setShowCart(false);
    }
  };
  
  // Send order to backend server
  const sendOrderToServer = async (customerInfo) => {
    // Create order summary
    let orderSummary = "";
    cart.forEach(item => {
      orderSummary += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Order data
    const orderData = {
      customerInfo: {
        name: customerInfo.name,
        mobile: customerInfo.mobile,
        address: customerInfo.address
      },
      orderItems: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity
      })),
      orderSummary: orderSummary,
      totalAmount: total
    };
    
    // Log the order data for debugging
    console.log('Order data being sent:', orderData);
    
    try {
      // Send order to backend server
      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('Order sent successfully!', result);
      } else {
        console.error('Failed to send order:', result.message);
      }
      
      // Show popup after attempting to send order
      setShowPopup(true);
    } catch (error) {
      console.error('Error sending order:', error);
      // Show popup even if order sending fails
      setShowPopup(true);
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
      </main>
      
      <Footer />
      
      {showPopup && <OrderPopup onClose={closePopup} />}
    </div>
  );
}

export default App;
