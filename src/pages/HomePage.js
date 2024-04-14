import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './HomePage.css'; // Importing CSS file
import logo from './images/pngegg.png'; // Importing image
import pickture1 from './images/nurse-doctor-team-ready-work-day.jpg'; // Importing image
import pickture2 from './images/doctors-hands-holding-medical-care-objects.jpg'; // Importing image
import icons1 from './images/icons1.png'; // Importing image
import icons2 from './images/icons2.png'; // Importing image
import icons3 from './images/icons3.png'; // Importing image
import icons4 from './images/icons4.png'; // Importing image
import pickture3 from './images/doctor3.png'; // Importing image
import tick from './images/tick.jpg'; // Importing image
import doctor1 from './images/doctor1.png'; // Importing image
import doctor2 from './images/doctor7.jpg'; // Importing image
import doctor3 from './images/doctor8.png'; // Importing image

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

        <div className="work-section-wrapper">
          <h1>Lorem ipsum dolor sit amet consectetur.</h1>

          <div className="work-section-bottom">
            
            <div className="work-section-info">
              <img src={icons1} alt="icon"/>
              <h2>Our Services</h2>
              <p>Discover amazing destinations with us.</p>
            </div>
            <div className="work-section-info">
              <img src={icons2} alt="icon"/>
              <h2>Our Services</h2>
              <p>Discover amazing destinations with us.</p>
            </div>
            <div className="work-section-info">
              <img src={icons3} alt="icon"/>
              <h2>Our Services</h2>
              <p>Discover amazing destinations with us.</p>
            </div>
            <div className="work-section-info">
              <img src={icons4} alt="icon"/>
              <h2>Our Services</h2>
              <p>Discover amazing destinations with us.</p>
            </div>
          </div>
        </div>

        <div className="why-you-choose-us">
          <img src={pickture3} alt="why"/>
          <div className="why-you-choose-us-text">
            <h2>Why Choose Us</h2>
            <div className="why-you-choose-us-info">
              <img src={tick} alt="tick"/>
              <p>Discover amazing destinations with us.</p>
            </div>
            <div className="why-you-choose-us-info">
              <img src={tick} alt="tick"/>
              <p>Discover amazing destinations with us.</p>
            </div>
            <div className="why-you-choose-us-info">
              <img src={tick} alt="tick"/>
              <p>Discover amazing destinations with us.</p>
            </div>
            <div className="why-you-choose-us-info">
              <img src={tick} alt="tick"/>
              <p>Discover amazing destinations with us.</p>
            </div>
          </div>
          
        </div>

        <div className="about">
          <div className='about-text'>
            <h1>Top doctor from the world</h1>
          </div>
          <div className='about-image'>
            <div className='about-image-doctor'>
              <img src={doctor1} alt="doctor"/>
              <p>Dr. John Doe</p>
              <button>Book Now</button>
            </div>
            <div className='about-image-doctor'>
              <img src={doctor2} alt="doctor"/>
              <p>Dr. John Doe</p>
              <button>Book Now</button>
            </div>
            <div className='about-image-doctor'>
              <img src={doctor3} alt="doctor"/>
              <p>Dr. John Doe</p>
              <button>Book Now</button>
            </div>
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
