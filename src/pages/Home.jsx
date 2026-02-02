import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to MyOrder</h1>
        <p>
          Book and order your favorite devices easily, securely, and fast.
        </p>
        <button>Shop Now</button>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-list">
          <div className="category-card">
            <h3>Mobile Phones</h3>
            <p>Latest smartphones at best prices</p>
          </div>

          <div className="category-card">
            <h3>Laptops</h3>
            <p>High-performance laptops for work & gaming</p>
          </div>

          <div className="category-card">
            <h3>Accessories</h3>
            <p>Headphones, chargers, and more</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose MyOrder?</h2>
        <ul>
          <li>✔ Easy device booking</li>
          <li>✔ Secure payments</li>
          <li>✔ Fast delivery</li>
          <li>✔ Trusted sellers</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Order?</h2>
        <p>Start booking your device today with MyOrder.</p>
        <button>Get Started</button>
      </section>
    </div>
  );
};

export default Home;
