import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './Profile/Profile.js'
//Import Auth
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import PasswordReset from './Auth/PasswordReset.js';
import ChangePassword from './Auth/ChangePassword.js';
import { auth } from './services/firebase-config.js';

import { AuthProvider } from '../context/AuthContext.js'
import { useState, useEffect } from 'react'
// import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from '../PrivateRoute'
import HomePage from './HomePage/HomePage.js';
import Patient from './Patient/Patient.js';
import Administrator from './Administrator/Administrator.js';
import PAppointment from './Patient/components/Appointment.js';
import Doctor from './Doctor/Doctor.js';
import DAppointment from './Doctor/components/Appointment.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/password-reset" component={PasswordReset} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path='/doctor' component={Doctor} />
          <PrivateRoute exact path="/dappointment" component={DAppointment} />
          <PrivateRoute exact path='/administrator' component={Administrator} />
          <PrivateRoute exact path='/patient' component={Patient} />
          <PrivateRoute exact path="/pappointment" component={PAppointment} />
          <PrivateRoute exact path='/profile' component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
