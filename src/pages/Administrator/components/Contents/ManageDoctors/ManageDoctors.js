import React from 'react';
import { useState, useEffect } from 'react';
import './ManageDoctors.css';
import { collection, addDoc, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { db } from '../../../../services/firebase-config';
import { CiTrash } from "react-icons/ci";
import AdminNavbar from '../../AdminNavbar';


const ManageDoctors = () => {
    const [title, setTitle] = useState(['STT', 'Tên', 'Email', 'SĐT', 'Giới Tính', 'Ngày Sinh', 'Chuyên Môn', 'Trạng Thái', 'UID']);
    const [doctors, setDoctors] = useState([]);

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

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    return (
        <div>
            <AdminNavbar />
            <div class="managerDoctor">
                <a id="newDoctor" href="#">Thêm Mới</a>
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
                            <td>{item.Name}</td>
                            <td>{item.Email}</td>
                            <td>{item.PhoneNumber}</td>
                            <td>{item.Sex === true? "Nam" : "Nữ"}</td>
                            <td>{formatDate(new Date(item.DateOfBirth.seconds * 1000))}</td>
                            <td>{item.Expertise}</td>
                            <td>{item.Status === true? "Sẵn sàng" : "Bận"}</td>
                            <td>{item.UID}</td>
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