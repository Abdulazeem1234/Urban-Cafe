import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Urban-Cafe</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Urban-Cafe is your go-to destination for delicious chicken specialties and refreshing beverages. We serve the finest quality chicken dishes prepared with love and the freshest ingredients.</p>
            <p>Our menu includes a variety of chicken pizzas, burgers, rolls, biryani, and shawarma, along with our signature milk shakes, faluda, and ice creams.</p>
            <p>We pride ourselves on providing excellent service and delicious food that keeps our customers coming back for more.</p>
          </div>
          <div className="about-image">
            <img src="images/cafe-image.jpg" alt="Urban-Cafe Interior" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
