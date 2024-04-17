import { useState, useEffect } from 'react';
import './forms.css';
import { db } from '../services/firebase-config';
import { collection, query, where, getDocs, doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthValue } from '../../contex/AuthContext';
import { Link } from 'react-router-dom';
import './appointmentb.scss';

const AppointmentB = () => {
    const { currentUser } = useAuthValue();
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRef = doc(db, 'patient', currentUser.uid);
                const userDoc = await getDoc(userRef);
                const data = userDoc.data();
                console.log('userDoc:', data);
                
                setUserData(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchData();
    }, [currentUser]);

    const deleteDoctorAppointments = async (appointment, patientName) => {
        try {
            // Tìm tài liệu của bác sĩ dựa trên tên
            const q = query(collection(db, 'doctor'), where('name', '==', appointment.doctorName));
            const querySnapshot = await getDocs(q);
            const doctorDoc = querySnapshot.docs[0];
            
                // Lọc ra các cuộc hẹn có 'nameDoctor' giống với 'nameDoctor' cần xóa
                const doctorAppointments = doctorDoc.data().appointments || [];
                const updatedAppointments = doctorAppointments.filter(appt => 
                    appt.date !== appointment.date || 
                    appt.time !== appointment.time || 
                    appt.patientName !== patientName // Corrected comparison
                );        
                // Cập nhật tài liệu với danh sách cuộc hẹn đã lọc

            await updateDoc(doctorDoc.ref, { appointments: updatedAppointments });
            

    
            // Cập nhật trạng thái cục bộ để cập nhật giao diện người dùng
            
            console.log('Doctor appointments deleted successfully!');
        } catch (error) {
            console.error('Error deleting doctor appointments:', error);
        }
    };

    const deleteAppointment = async (appointment) => {
        try {
            const userRef = doc(db, 'patient', currentUser.uid);
            const userDoc = await getDoc(userRef);
            // Find the document containing the appointment
                const userAppointments = userDoc.data().appointments || [];
                const updatedAppointments = userAppointments.filter(appt => 
                    appt.date !== appointment.date || 
                    appt.time !== appointment.time || 
                    appt.doctorName !== appointment.doctorName);
                console.log('updatedAppointments:', updatedAppointments);
                console.log('userAppointments:', userAppointments);
                console.log('appointment:', appointment);
                // Update the document with the updated appointments array
                await updateDoc(userRef, { appointments: updatedAppointments });

            // Update the local state to reflect the deletion
            setUserData({ ...userData, appointments: updatedAppointments });
                          
            console.log('Appointment deleted successfully!');
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    
    

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/appointmentA">AppointmentA</Link></li>
                    <li><Link to="/appointmentB">AppointmentB</Link></li>
                </ul>
            </nav>
            <h1>AppointmentB</h1>
            <ul className='appointment'>
                {userData && userData.appointments ? (
                    userData.appointments.map((appointment, index) => (
                        <li key={index}>
                            <div>
                                <p><strong>DoctorName: </strong>{appointment.doctorName}</p>
                                <p><strong>Date: </strong>{appointment.date}</p>
                                <p><strong>Time: </strong>{appointment.time}</p>
                                <button onClick={() => (deleteAppointment(appointment), deleteDoctorAppointments(appointment, userData.name))}>Cancel Appointment</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No appointments found</li>
                )}
            </ul>
        </div>
    );
};

export default AppointmentB;
