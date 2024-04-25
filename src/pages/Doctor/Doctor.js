import React from 'react';
import '../HomePage/HomePage.css'; // Importing CSS file
import './Doctor.css'
import DoctorNavbar from './components/DoctorNavbar';



function Patient() {  
  return (
    
    <div className="home-page-container">
      <DoctorNavbar />
    </div>
  );
}

export default Patient;
