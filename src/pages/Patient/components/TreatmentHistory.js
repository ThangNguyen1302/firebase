import { useState, useEffect } from "react";
import { db } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthValue } from "../../../context/AuthContext";

const TreatmentHistory = () => {
  const { currentUser } = useAuthValue();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        const data = userDoc.data();

        setUserData(data);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div>
      <h1>Treatment History</h1>

      {userData && userData.history ? (
        userData.history.map((history, index) => (
          <div key={index}>
            <p>Start day: {history.Day_start}</p>
            <p>Diagnosis: {history.Diagnosis} </p>
            <p>Health status: {history.Health_status} </p>
            <p>Treatment: {history.Treatments} </p>
            <p>Doctor: {history.DoctorName} </p>
            
          </div>
        ))
      ) : (
        <div>
          <ul>
            <p>Start day: </p>
            <p>Diagnosis: </p>
            <p>Health status: </p>
            <p>Treatment: </p>
            <p>Doctor: </p>
          </ul>
        </div>
      )}
    </div>
  );
};
export default TreatmentHistory;