import React from "react";
import PatientNavbar from "./PatientNavbar";
import OIP from "../../images/OIP.jpg";
import UpdatePatientInformation from "./UpdatePatientInformation";
import InformationDetail from "./InformationDetail";
import TreatmentHistory from "./TreatmentHistory";
import { useState } from "react";
function PatientProfile() {
  const [showUpdate, setShowUpdate] = useState(false);

    const handleUpdateClick = () => {
        setShowUpdate(true);
    };
    const handleBackClick = () => {
      setShowUpdate(false);
  };
  return (
    <div className="home-page-container">
      <PatientNavbar />
      <div className="row">
        <div className="leftcolumn">
          <div className="card">
            <img src={OIP} alt="oip"></img>
          </div>
        </div>
        <div className="rightcolumn">
          <div>
          <div className="card">
            
            {/* <UpdatePatientInformation/> */}
            {showUpdate ? <UpdatePatientInformation /> : <InformationDetail />}
            {showUpdate ? (
                <button onClick={handleBackClick}>Back to detail</button>
            ) : (
                <button onClick={handleUpdateClick}>Update</button>
            )}
            
          </div>
          </div>
          <div className="card">
            <TreatmentHistory/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PatientProfile;