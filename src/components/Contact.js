import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import OrderPopup from './OrderPopup';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  // Validate mobile number (10 digits)
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };
  
  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.name) {
      setPopupMessage('Please enter your name.');
      setShowPopup(true);
      return;
    }
    
    if (!formData.phone) {
      setPopupMessage('Please enter your phone number.');
      setShowPopup(true);
      return;
    }
    
    if (!validateMobile(formData.phone)) {
      setPopupMessage('Please enter a valid 10-digit phone number.');
      setShowPopup(true);
      return;
    }
    
    if (formData.email && !validateEmail(formData.email)) {
      setPopupMessage('Please enter a valid email address.');
      setShowPopup(true);
      return;
    }
    
    if (!formData.message) {
      setPopupMessage('Please enter your message.');
      setShowPopup(true);
      return;
    }
    
    try {
      // Prepare email parameters
      const templateParams = {
        to_email: 'zubbi216@gmail.com',
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email || 'Not provided',
        message: formData.message
      };
      
      // Send email using EmailJS
      // IMPORTANT: You need to replace these placeholder values with your actual EmailJS credentials
      const result = await emailjs.send(
        'YOUR_ACTUAL_SERVICE_ID',     // Replace with your Service ID
        'YOUR_ACTUAL_TEMPLATE_ID',    // Replace with your Template ID
        templateParams,
        'YOUR_ACTUAL_USER_ID'         // Replace with your User ID
      );
      
      if (result.text === 'OK') {
        // Show success popup
        setPopupMessage('Thank you for your message! We will get back to you soon.');
        setShowPopup(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        // Show error popup
        setPopupMessage('Sorry, there was an error sending your message. Please try again later.');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setPopupMessage('Sorry, there was an error sending your message. Please try again later.');
      setShowPopup(true);
    }
  };
  
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Address</h4>
                <p>hosapete street, back gate of iqhra masjid,<br />arehalli, belur taluk,<br />hassan district - 573101</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>8073187193<br />8618837676</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>zubbi216@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-truck"></i>
              <div>
                <h4>Delivery</h4>
                <p>Free delivery within 1 km of Arehalli</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form id="message-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                id="name" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
              <input 
                type="tel" 
                id="phone" 
                placeholder="Your Phone" 
                required 
                value={formData.phone}
                onChange={handleChange}
              />
              <input 
                type="email" 
                id="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
              />
              <textarea 
                id="message" 
                placeholder="Your Message" 
                rows="5" 
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <OrderPopup 
        message={popupMessage} 
        isVisible={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </section>
  );
};

export default Contact;
