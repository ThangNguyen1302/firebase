import './profile.css'
import { useEffect, useState } from 'react';
import { useAuthValue } from '../../contex/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../services/firebase-config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useHistory } from 'react-router-dom'; // Import useHistory
import { Link } from 'react-router-dom';

function Profile() {
  const { currentUser } = useAuthValue();
  const [userProfile, setUserProfile] = useState(null);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchUserProfile = async () => {
      const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setUserProfile(doc.data());
        console.log(doc.data());
      });
    };

    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser]);

  const handleSignOut = () => {
    signOut(auth);
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
      <div className='profile'>
        <h1>Profile</h1>
        {userProfile && (
          <>
            <p><strong>Type: </strong>{userProfile.type}</p>
            <p><strong>Name: </strong>{userProfile.name}</p>
            <p><strong>Email: </strong>{currentUser.email}</p>
            <p>
              <strong>Email verified: </strong>
              {`${currentUser.emailVerified}`}
            </p>
          </>
        )}
        <p>Go to appointment</p>
        <span onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
