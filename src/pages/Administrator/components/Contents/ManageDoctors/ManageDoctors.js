import React from 'react';
import { useState, useEffect } from 'react';
import './ManageDoctors.css';
import { collection, addDoc, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../services/firebase-config'; 
import { CiTrash } from "react-icons/ci";
import AdminNavbar from '../../AdminNavbar';
import { useHistory } from 'react-router-dom';

const ManageDoctors = () => {
    const [title, setTitle] = useState(['Order', 'Name', 'Email', 'Phone Number', 'Gender', 'Day Of Birth', 'Major', 'Status', 'UID']);
    const [doctors, setDoctors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ref = collection(db, 'doctor');
                const querySnapshot = await getDocs(ref);
                const doctorList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDoctors(doctorList);
            } catch (error) {
                console.error("Error getting documents:", error);
            }
        };

        fetchData();

        const unsubscribe = onSnapshot(collection(db, 'doctor'), (snapshot) => {
            const updatedDoctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDoctors(updatedDoctors);
        });

        return () => unsubscribe();
    }, []);


    const deleteDoctor = async (doctorId) => {
        try {
            await deleteDoc(doc(db, 'doctor', doctorId));
            setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
            console.log("Doctor deleted successfully!");
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    const handleDeleteDoctor = (doctorId) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này không?");
        if (isConfirmed) {
            deleteDoctor(doctorId);
        }
    };

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${day}/${month}/${year}`;
    };

    const handleAddDoctor = () => {
        history.push('/signupdoc');
    };
    return (
        <div>
            <AdminNavbar />
            <div class="managerDoctor">
                <button onClick={handleAddDoctor}>Add Doctor</button>
            </div>
            <table>
                <thead>
                    <tr>
                        {title.map((t, index) => (
                            <th key={index}>{t}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phonenumber}</td>
                            <td>{item.gender === true? "Male" : "Female"}</td>
                            <td>{formatDate(item.birth)}</td>
                            <td>{item.major}</td>
                            <td>{item.status === true? "Ready" : "Busy"}</td>
                            <td>{item.uid}</td>
                            <td>
                                <CiTrash
                                    style={{ fontSize: '24px', color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleDeleteDoctor(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageDoctors;