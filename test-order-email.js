const axios = require('axios');

// Test order data
const testOrder = {
  customerInfo: {
    name: 'Test Customer',
    mobile: '1234567890',
    address: '123 Test Street, Test City'
  },
  orderItems: [
    {
      name: 'Test Item',
      quantity: 2,
      price: 10.50,
      totalPrice: 21.00
    }
  ],
  totalAmount: 21.00
};

// Send test order
async function testOrderEmail() {
  try {
    const response = await axios.post('http://localhost:5000/api/order', testOrder);
    console.log('Order submission response:', response.data);
  } catch (error) {
    console.error('Error submitting order:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testOrderEmail();
