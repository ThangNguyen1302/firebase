// src/components/Profile.js
import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../services/firebase-config';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthValue } from '../../../context/AuthContext';
import DoctorNavbar from './DoctorNavbar';

function Profile() {
  const { currentUser } = useAuthValue();
  const [userProfile, setUserProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const [editedProfile, setEditedProfile] = useState({
    name: '',
    gender: Boolean,
    birth: '',
    major: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'doctor', currentUser.uid);
        const userDoc = await getDoc(userRef);
        const data = userDoc.data();
        setUserProfile(data);
        setEditedProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleInputChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };
  

  const handleGenderChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value === 'Male' ? true : false });
  }

  const handleCloseForm = () => {
    setEditingProfile(false);
  }

  const handleEditProfile = () => {
    setEditingProfile(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'doctor', currentUser.uid);
      await updateDoc(userRef, editedProfile);
      setUserProfile(editedProfile);
      setEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div>
      <DoctorNavbar />
      <div className="doctor">
          <div className="profile_doctor">
            <h2>Profile</h2>

            {editingProfile && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={handleCloseForm}>
                    &times;
                  </span>
                  <h2>Update Profile</h2>
                  <form onSubmit={handleFormSubmit} className="device-form">
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={editedProfile.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender:</label>
                      <select
                        id="gender"
                        name="gender"
                        placeholder="Gender"
                        value={editedProfile.gender ? 'Male' : 'Female'}
                        onChange={handleGenderChange}
                      >
                        <option value="">-- Select gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="birth">Birth:</label>
                      <input
                        id="birth"
                        name="birth"
                        placeholder="Birth"
                        value={editedProfile.birth}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="major">Majoring:</label>
                      <input
                        id="major"
                        name="major"
                        placeholder="Major"
                        value={editedProfile.major}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phonenumber:</label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="PhoneNumber"
                        value={editedProfile.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit">Save</button>
                  </form>
                  
                </div>
              </div>
            )}

            {userProfile && <h3 className="BS">DR. {userProfile.name}</h3> }
            <div className="information">
            <div className='in4'>
                  <p>Email: </p>
                  <p>Name: </p>
                  <p>Gender: </p>
                  <p>Birth: </p>
                  <p>Majoring: </p>
                  <p>PhoneNumber</p>
              </div>
              {userProfile && (
                <div className='infor'>
                  <p> {userProfile.email}</p>
                  <p> {userProfile.name}</p>
                  <p> {userProfile.gender ? 'Male' : 'Female'}</p>
                  <p> {userProfile.birth}</p>
                  <p> {userProfile.major}</p>
                  <p> {userProfile.phoneNumber}</p>
                </div>
              )}
            </div>
            <button className='button' onClick={() => {
              setEditedProfile(userProfile);
              setEditingProfile(true);
            }}>
              Update
            </button>
          </div>
        </div>
      </div>
  );
}

export default Profile;
