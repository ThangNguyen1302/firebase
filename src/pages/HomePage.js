import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './HomePage.css'; // Importing CSS file
import logo from './images/pngegg.png'; // Importing image
import pickture1 from './images/nurse-doctor-team-ready-work-day.jpg'; // Importing image
import pickture2 from './images/doctors-hands-holding-medical-care-objects.jpg'; // Importing image

function HomePage() {
  const history = useHistory(); // Access history object

  const handleSignUp = () => {
    history.push("/register"); // Navigate to the registration page
  }
  
  return (
    <div className="home-page-container">
      <header>
        <div className="container">
          
          <nav>
            <img src={logo} alt="logo"/>
            
            <div className="menu-icon">
            <Link to="#">Home</Link>
            <Link to="#">About</Link>
            <Link to="#">Services</Link>
            <Link to="#">Contact</Link>

            <button onClick={handleSignUp}>Sign Up</button>
            </div>
            
          </nav>
        </div>
      </header>

        <div className="hero">
          <img src={pickture1} alt="hero"/>
          <div className="hero-text">
            <h2>Your Journey Begins Here</h2>
            <p>Discover the world with us</p>
          </div>
          <button>Explore</button>
        </div>

        <div className="about">
          <img src={pickture2} alt="about"/>
          <h2>Our Features</h2>
          <div className="feature">
            <h3>Quality Service</h3>
            <p>We provide top-notch services to our customers.</p>
          </div>
          <div className="feature">
            <h3>Expert Guides</h3>
            <p>Our experienced guides will make your journey memorable.</p>
          </div>
          <div className="feature">
            <h3>Exciting Destinations</h3>
            <p>Explore amazing destinations with us.</p>
          </div>
        </div>

      <footer>
        <div className="container">
          <p>&copy; 2024 Beautiful Homepage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
