import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { db } from '../../services/firebase-config';
import { CiTrash } from "react-icons/ci";

const Content = ({show, show_content}) => {
    const [title, setTitle] = useState(['STT', 'Tên', 'Email']);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
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

    const addDoctorToFirestore = async (newData) => {
        try {
            const docRef = await addDoc(collection(db, 'doctor'), newData);
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

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

    const onClickAddDoctor = async () => {
        try {
            const docId = await addDoctorToFirestore({ name: newName, email: newEmail });
            if (docId) {
                setDoctors([...doctors, { id: docId, name: newName, email: newEmail }]);
                setNewName('');
                setNewEmail('');
            }
        } catch (error) {
            console.error("Error adding doctor:", error);
        }
    };

    const onChangeNewName = (e) => {
        setNewName(e.currentTarget.value);
    };

    const onChangeNewEmail = (e) => {
        setNewEmail(e.currentTarget.value);
    };

    return (
        <div className={show? "content-tabs active" : "content-tabs"}>
            <div className={show_content == 1? "content active" : "content"}>
                <h2>HOME</h2>
            </div>
            <div className={show_content == 2? "content active" : "content"}>
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
                <input className="addDoctor" onChange={onChangeNewName} name='name' placeholder='Hãy nhập tên'/>
                <input className="addDoctor" onChange={onChangeNewEmail} name='email' placeholder='Hãy nhập email'/>
                <button className="addDoctor" onClick={onClickAddDoctor}>Thêm mới</button>
            </div>
            <div className={show_content == 3? "content active" : "content"}>
                <h2>Equipments</h2>
            </div>
            <div className={show_content == 4? "content active" : "content"}>
                <h2>Content 4</h2>
            </div>
        </div>
    )
}

export default Content;