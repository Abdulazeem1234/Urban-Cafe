const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration (update with your email service credentials)
// For Gmail, you'll need to use an App Password instead of your regular password
// See: https://support.google.com/accounts/answer/185833
const emailConfig = {
  service: 'gmail', // or your email service provider
  auth: {
    user: process.env.EMAIL_USER || 'zubbi216@gmail.com', // your email address
    pass: process.env.EMAIL_PASS || 'pcpf msyb jnby wgrb'      // your email app password
  }
};

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: emailConfig.auth
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter configuration error:', error);
  } else {
    console.log('Email transporter is ready to send emails');
  }
});

// Function to send order email
async function sendOrderEmail(orderData) {
  try {
    // Create email content
    let orderSummary = '';
    orderData.orderItems.forEach(item => {
      orderSummary += `${item.name} x ${item.quantity} = ₹${item.totalPrice}\n`;
    });
    
    const mailOptions = {
      from: emailConfig.auth.user,
      to: 'zubbi216@gmail.com', // Restaurant email
      subject: `New Order #${orderData.id} - Urban Cafe`,
      text: `New order received:

Customer Information:
Name: ${orderData.customerInfo.name}
Mobile: ${orderData.customerInfo.mobile}
Address: ${orderData.customerInfo.address}

Order Details:
${orderSummary}

Total Amount: ₹${orderData.totalAmount}

Order ID: ${orderData.id}
Order Time: ${orderData.timestamp}`,
      html: `
        <h2>New Order Received - Urban Cafe</h2>
        <p><strong>Order ID:</strong> ${orderData.id}</p>
        <p><strong>Order Time:</strong> ${orderData.timestamp}</p>
        
        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${orderData.customerInfo.name}</p>
        <p><strong>Mobile:</strong> ${orderData.customerInfo.mobile}</p>
        <p><strong>Address:</strong> ${orderData.customerInfo.address}</p>
        
        <h3>Order Details:</h3>
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.orderItems.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.totalPrice}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h3>Total Amount: ₹${orderData.totalAmount}</h3>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Order email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending order email:', error);
  }
}

// Function to send contact form email
async function sendContactEmail(contactData) {
  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: 'zubbi216@gmail.com', // Restaurant email
      subject: `New Contact Message from ${contactData.name} - Urban Cafe`,
      text: `New contact message received:

Name: ${contactData.name}
Phone: ${contactData.phone}
Message: ${contactData.message}

Time: ${new Date().toISOString()}`,
      html: `
        <h2>New Contact Message - Urban Cafe</h2>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        
        <h3>Contact Information:</h3>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        
        <h3>Message:</h3>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}

// Store orders in memory (in production, you would use a database)
let orders = [];

// Endpoint to receive orders
app.post('/api/order', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Add timestamp to order
    const orderWithTimestamp = {
      ...orderData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    // Store order
    orders.push(orderWithTimestamp);
    
    // Log order to console
    console.log('New order received:', orderWithTimestamp);
    
    // Send email notification
    await sendOrderEmail(orderWithTimestamp);
    
    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Order received successfully', 
      orderId: orderWithTimestamp.id 
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing order' 
    });
  }
});

// Endpoint to get all orders (for testing/admin purposes)
app.get('/api/orders', (req, res) => {
  res.status(200).json({ 
    success: true, 
    orders: orders 
  });
});

// Endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const contactData = req.body;
    
    // Log contact message to console
    console.log('New contact message received:', contactData);
    
    // Send email notification
    const emailSent = await sendContactEmail(contactData);
    
    if (emailSent) {
      res.status(200).json({ 
        success: true, 
        message: 'Message received successfully' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Error sending message' 
      });
    }
  } catch (error) {
    console.error('Error processing contact message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing message' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Order endpoint: http://localhost:${PORT}/api/order`);
});

module.exports = app;
