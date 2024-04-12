import { useState } from 'react';
import './forms.css';
import { db } from '../firebase';
import { getDoc, updateDoc, doc } from "firebase/firestore"; // Import các biến và hàm từ Firebase Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthValue } from '../contex/AuthContext';
import { Link } from 'react-router-dom';


const isValid = (e, date, time) => {
    if (e.appointments == null) {
        console.log('Appointment is valid');
        return true;
    }
    
    // Check if there are existing appointments that match the provided date and time
    const conflictingAppointment = e.appointments.find(appointment => appointment.date === date && appointment.time === time);
    
    if (!conflictingAppointment) {
        console.log('Appointment is valid');
        return true;
    }

    // If there is a conflicting appointment, it's invalid
    console.log('Appointment is not valid');
    return false;
};

const AppointmentA = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const { currentUser } = useAuthValue();



    const bookAppointment = async (e) => {
        e.preventDefault();
        console.log('currentUser: ',currentUser);
        try {
            // Lấy tài liệu người dùng từ Firestore
            const q = query(collection(db, 'patient'), where('uid', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const userDoc = querySnapshot.docs[0]; // Lấy tài liệu người dùng đầu tiên từ querySnapshot
            const userData = userDoc.data(); // Dữ liệu hiện tại của người dùng

            try{
                const qDoctor = query(collection(db, 'doctor'), where('name', '==', 'doc'));
                const doctorsQuerySnapshot = await getDocs(qDoctor);
                const doctorsDoc = doctorsQuerySnapshot.docs[0];
                const doctorsData = doctorsDoc.data();

                if(isValid(doctorsData, date, time)){
                    const updatedDoctorData = {
                        ...doctorsData,
                        appointments: [
                            ...doctorsData.appointments,
                        ]
                    };
                    
                    
                        // Nếu mảng cuộc hẹn không rỗng, thêm cuộc hẹn mới vào cuối mảng
                        updatedDoctorData.appointments.push({
                            patientName: userData.name,
                            date: date,
                            time: time
                        });
                    
                    
                    await updateDoc(doctorsDoc.ref, updatedDoctorData);
                    
                }
                else{
                    console.log('Appointment is not valid');
                    return;
                }
            }
            catch(error){
                console.error('Error getting doctors: ', error);
            }

            

            // Cập nhật hoặc thêm các trường mới vào tài liệu người dùng
            const updatedUserData = {
                ...userData,
                appointments: [
                    ...userData.appointments,
                ]
            };
            
            
                // Nếu mảng cuộc hẹn không rỗng, thêm cuộc hẹn mới vào cuối mảng
                updatedUserData.appointments.push({
                    doctorName: 'doc',
                    date: date,
                    time: time
                });
            

            // Cập nhật tài liệu người dùng với dữ liệu mới
            await updateDoc(userDoc.ref, updatedUserData);

            console.log('Appointment updated successfully!');
        } catch (error) {
            console.error('Error updating appointment: ', error);
        }
    };

    return (
        <div className='center'>
            <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/appointmentA">AppointmentA</Link></li>
          <li><Link to="/appointmentB">AppointmentB</Link></li>
        </ul>
      </nav>
            <div className='form'>
                <h1>Book Appointment</h1>
                <form onSubmit={bookAppointment}>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <input
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentA;
