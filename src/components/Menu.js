import React, { useState } from 'react';

const Menu = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Menu data with attractive item names and prices
  const menuItems = [
    // Chicken Pizza
    { id: 1, name: "Classic Chicken Pizza", category: "pizza", price: 250, image: "images/pizza1.jpg", description: "Mozzarella, tomato sauce, and tender chicken pieces" },
    { id: 2, name: "Spicy Chicken Pizza", category: "pizza", price: 280, image: "images/pizza2.jpg", description: "Spicy chicken, jalapeños, and melted cheese" },
    { id: 3, name: "BBQ Chicken Pizza", category: "pizza", price: 300, image: "images/pizza3.jpg", description: "BBQ sauce, chicken, onions, and cilantro" },
    
    // Chicken Burger
    { id: 4, name: "Crispy Chicken Burger", category: "burger", price: 180, image: "images/burger1.jpg", description: "Crispy chicken patty with lettuce and mayo" },
    { id: 5, name: "Grilled Chicken Burger", category: "burger", price: 200, image: "images/burger2.jpg", description: "Juicy grilled chicken with veggies" },
    { id: 6, name: "Spicy Chicken Burger", category: "burger", price: 190, image: "images/burger3.jpg", description: "Spicy chicken patty with special sauce" },
    
    // Chicken Rolls
    { id: 7, name: "Chicken Seekh Roll", category: "rolls", price: 150, image: "images/roll1.jpg", description: "Spiced chicken seekh with mint chutney" },
    { id: 8, name: "Crispy Chicken Roll", category: "rolls", price: 160, image: "images/roll2.jpg", description: "Crispy fried chicken with veggies" },
    
    // Chicken Biryani
    { id: 9, name: "Hyderabadi Chicken Biryani", category: "biryani", price: 220, image: "images/biryani1.jpg", description: "Traditional Hyderabadi style with aromatic rice" },
    { id: 10, name: "Tandoori Chicken Biryani", category: "biryani", price: 240, image: "images/biryani2.jpg", description: "Tandoori chicken with basmati rice" },
    
    // Chicken Shawarma
    { id: 11, name: "Classic Chicken Shawarma", category: "shawarma", price: 170, image: "images/shawarma1.jpg", description: "Tender chicken with garlic sauce" },
    { id: 12, name: "Spicy Chicken Shawarma", category: "shawarma", price: 180, image: "images/shawarma2.jpg", description: "Spicy chicken with harissa sauce" },
    
    // Milk Shakes
    { id: 13, name: "Chocolate Milk Shake", category: "shakes", price: 120, image: "images/shake1.jpg", description: "Rich chocolate shake with ice cream" },
    { id: 14, name: "Vanilla Milk Shake", category: "shakes", price: 110, image: "images/shake2.jpg", description: "Creamy vanilla shake with toppings" },
    { id: 15, name: "Strawberry Milk Shake", category: "shakes", price: 130, image: "images/shake3.jpg", description: "Fresh strawberry shake with cream" },
    
    // Faluda
    { id: 16, name: "Rose Faluda", category: "faluda", price: 140, image: "images/faluda1.jpg", description: "Traditional rose faluda with vermicelli" },
    { id: 17, name: "Chocolate Faluda", category: "faluda", price: 150, image: "images/faluda2.jpg", description: "Chocolate faluda with nuts" },
    
    // Ice Creams
    { id: 18, name: "Butterscotch Ice Cream", category: "icecream", price: 80, image: "images/icecream1.jpg", description: "Rich butterscotch flavor with nuts" },
    { id: 19, name: "Chocolate Ice Cream", category: "icecream", price: 70, image: "images/icecream2.jpg", description: "Classic chocolate ice cream" },
    { id: 20, name: "Vanilla Ice Cream", category: "icecream", price: 60, image: "images/icecream3.jpg", description: "Smooth vanilla with chocolate sauce" }
  ];
  
  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  // Category tabs
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'pizza', name: 'Chicken Pizza' },
    { id: 'burger', name: 'Chicken Burger' },
    { id: 'rolls', name: 'Chicken Rolls' },
    { id: 'biryani', name: 'Chicken Biryani' },
    { id: 'shawarma', name: 'Chicken Shawarma' },
    { id: 'shakes', name: 'Milk Shakes' },
    { id: 'faluda', name: 'Faluda' },
    { id: 'icecream', name: 'Ice Creams' }
  ];
  
  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        <div className="menu-tabs">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="menu-grid" id="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-item-price">₹{item.price}</div>
                <button 
                  className="add-to-cart"
                  onClick={() => onAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
