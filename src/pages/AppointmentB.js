import { useState, useEffect } from 'react';
import './forms.css';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { useAuthValue } from '../contex/AuthContext';
import { Link } from 'react-router-dom';
import './appointmentb.scss';

const AppointmentB = () => {
    const { currentUser } = useAuthValue();
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'patient'), where('uid', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                
                // const appointments = [];
                // querySnapshot.forEach(doc => {
                //     const userAppointments = doc.data().appointments || [];
                //     appointments.push(...userAppointments);
                // });
                // setUserData(appointments);
                const userDoc = querySnapshot.docs[0]; 
                const data = userDoc.data();
                console.log('userDoc:', data);
                
                setUserData(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchData();
    }, [currentUser]);

    const deleteAppointment = async (appointment) => {
        try {
            // Find the document containing the appointment
            const q = query(collection(db, 'patient'), where('uid', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(doc => {
                const userAppointments = doc.data().appointments || [];
                const updatedAppointments = userAppointments.filter(appt => 
                    appt.date !== appointment.date || 
                    appt.time !== appointment.time || 
                    appt.doctorName !== appointment.doctorName
                );
                console.log('updatedAppointments:', updatedAppointments);
                console.log('userAppointments:', userAppointments);
                console.log('appointment:', appointment);
                // Update the document with the updated appointments array
                setDoc(doc.ref, { appointments: updatedAppointments }, { merge: true });
            });

            // Update the local state to reflect the deletion
            setUserData(prevAppointments => ({
                appointments: prevAppointments.appointments.filter(appt => appt.date !== appointment.date && appt.time !== appointment.time && appt.doctorName !== appointment.doctorName)
              }));
                          
            console.log('Appointment deleted successfully!');
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const deleteDoctorAppointments = async (appointment, patientName) => {
        try {
            // Tìm tài liệu của bác sĩ dựa trên tên
            const q = query(collection(db, 'doctor'), where('name', '==', appointment.nameDoctor));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(doc => {
                // Lọc ra các cuộc hẹn có 'nameDoctor' giống với 'nameDoctor' cần xóa
                const doctorAppointments = doc.data().appointments || [];
                const updatedAppointments = doctorAppointments.filter(appt => 
                    appt.date !== appointment.date || 
                    appt.time !== appointment.time || 
                    appt.doctorName !== appointment.patientName
                );
                                
                // Cập nhật tài liệu với danh sách cuộc hẹn đã lọc
                setDoc(doc.ref, { appointments: updatedAppointments }, { merge: true });
            });
    
            // Cập nhật trạng thái cục bộ để cập nhật giao diện người dùng
            
            console.log('Doctor appointments deleted successfully!');
        } catch (error) {
            console.error('Error deleting doctor appointments:', error);
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
