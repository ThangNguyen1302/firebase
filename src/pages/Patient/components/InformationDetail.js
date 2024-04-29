import { useState, useEffect } from "react";
import { db } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthValue } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import UpdatePatientInformation from "./UpdatePatientInformation";

const InformationDetail = () => {
  const { currentUser } = useAuthValue();
  const [userData, setUserData] = useState();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, "user", currentUser.uid);
        console.log(currentUser.uid);
        const userDoc = await getDoc(userRef);
        const data = userDoc.data();
        console.log("userDoc: ", data);

        setUserData(data);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div>
      <h1>Information Detail</h1>

      {userData && userData.information ? (
        
          <div >
            <p>Name: {userData.information.name} </p>
            <p>Age: {userData.information.age} </p>
            <p>Gender: {userData.information.gender}</p>
            <p>Insurance code: {userData.information.insurance}</p>
            <p>Address: {userData.information.address}</p>
            <p>Email: {userData.information.email}</p>
            
          </div>
      ) : (
        <div>
          <div>
            <p> Name: </p>
            <p> Age: </p>
            <p> Gender: </p>
            <p> InsuranceCode: </p>
            <p> Email: </p>
            {/* <button onClick={() => (deleteAppointment(appointment), deleteDoctorAppointments(appointment, userData.name))}>Cancel Appointment</button> */}
          </div>
        </div>
      ) }
    </div>
  );
};
export default InformationDetail;