import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../../services/firebase-config';
import { collection, query, where, getDocs } from "firebase/firestore";

const PatientDetail = ({ patient }) => {
    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const qPatient = query(
                    collection(db, 'users'),
                    where('username', '==', patient.patientName),
                    where('email', '==', patient.patientMail)
                );
                const patientsQuerySnapshot = await getDocs(qPatient);
                if (!patientsQuerySnapshot.empty) {
                    const patientsDoc = patientsQuerySnapshot.docs[0];
                    const patientsData = patientsDoc.data();
                    setPatientData(patientsData);
                } else {
                    console.log('No patient data found');
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }

        };

        if (patient) {
            fetchPatientData();
        }
    }, [patient]);



    if (!patient) {
        return <div>Choose Patient</div>;
      }
      if (!patient.patientName) {
        return <div>No patient name available</div>;
      }

     

    return (
        <div className='doctor'>
            <div className='containerd'>
                <div className="patient-detail">
                    <h2>Patient Detail</h2>
                    <div className="informationp">
                        <div className='in4'>
                            <strong>
                            <p>Name: </p>
                            <p>Mail: </p>
                            </strong>
                        </div>
                        <div className='inforp'>
                            <p>{patient.patientName}</p>
                            <p>{patient.patientMail}</p>
                        </div>
                    </div>
                    <h3>History</h3>
                    {patientData && patientData.history ? (
                        patientData.history.map((his,index) => (
                        <ul key={index}>
                            <p className='stt'><strong>Time: {index}</strong></p>
                            <div className="informationp">
                                <div className='in4'>
                                    <strong>
                                    <p>Day Start: </p>
                                    <p>Doctor's Name: </p>
                                    <p>Diagnosis: </p>
                                    <p>Status: </p>
                                    <p>Treatments: </p>
                                    </strong>
                                </div>
                                <div className='inforp'>
                                    <p>{his.Day_start}</p>
                                    <p>{his.DoctorName}</p>
                                    <p>{his.Diagnosis}</p>
                                    <p>{his.Health_status}</p>
                                    <p>{his.Treatments}</p>
                                </div>
                            </div>
                            <br></br>
                        </ul>
                        ))
                        ) : (
                            <ul>No history</ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default PatientDetail;