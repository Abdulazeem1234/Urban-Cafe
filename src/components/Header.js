import React from 'react';

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1><i className="fas fa-utensils"></i> Urban-Cafe</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <a href="#cart" id="cart-icon" onClick={(e) => {
                e.preventDefault();
                onCartClick();
              }}>
                <i className="fas fa-shopping-cart"></i> Cart ({cartCount})
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
