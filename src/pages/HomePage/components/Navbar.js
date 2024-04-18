import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory(); // Access history object

    const handleLogin = () => {
        history.push("/login"); // Navigate to the login page
    };

    const handleSignUp = () => {
        history.push("/signup"); // Navigate to the registration page
    };

    const handleScrollToSection = (sectionId) => {
        const section = document.getElementsByClassName(sectionId)[0]; // Get the section by class name
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth' // Scroll smoothly to the section
            });
        }
    };

    return (
        <div className='header'>
            <div className="container">
                <nav>
                    
                    <div className="menu-icon">
                        <h2 className="logo" onClick={() => handleScrollToSection("home")}>HCMUT</h2>
                        <div className='menu-icon-control'>
                            <p  onClick={() => handleScrollToSection("home")}>Home</p>
                            <p  onClick={() => handleScrollToSection("services")}>Services</p>
                            <p  onClick={() => handleScrollToSection("about")}>About</p>
                            <p  onClick={() => handleScrollToSection("doctors")}>Doctors</p>
                        </div>
                        <div className='button-group'>
                            <button className='login' onClick={handleLogin}>Login</button>
                            <button className='logout' onClick={handleSignUp}>Sign Up</button>
                        </div>
                        
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
