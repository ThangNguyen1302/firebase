import { useState } from 'react';
import './forms.css';
import { auth, db } from './services/firebase-config';
import { useHistory, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { useAuthValue } from '../contex/AuthContext';


function Register() {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { setTimeActive } = useAuthValue();
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const register = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validatePassword()) return;

    try {
      // Create a new user with email and password using firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setTimeActive(true);

      // Add user to the database
      await setDoc(doc(db, type, user.uid), {
        name: name,
        email: user.email,
        appointments: appointments
      });

      // Redirect to verify email page
      history.push('/verify-email');
    } catch (error) {
      setError(error.message);
    }

    // Clear input fields
    setType('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <select onChange={e => setType(e.target.value)}>
            <option value=''>Select user type</option>
            <option value='patient'>Patient</option>
            <option value='doctor'>Doctor</option>
           
          </select>

          <input 
            type='text' 
            value={name}
            placeholder="Enter your name"
            required
            onChange={e => setName(e.target.value)}
          />

          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}
          />

          <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
