import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './Profile/Profile.js'
//Import Auth
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import PasswordReset from './Auth/PasswordReset.js';
import ChangePassword from './Auth/ChangePassword.js';
import { auth } from './services/firebase-config.js';

import { AuthProvider } from '../contex/AuthContext'
import { useState, useEffect } from 'react'
// import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from '../PrivateRoute'
import AppointmentA from './Appointment/AppointmentA'
import AppointmentB from './Appointment/AppointmentB'
import HomePage from './HomePage/HomePage.js';
// import Navbar from '../Navbar.js';

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
          {/* <Route exact path="/signin" component={Test} /> */}
          {/* <Route exact path='/verify-email' component={VerifyEmail} /> */}
          <Route exact path="/" component={HomePage} />
          {/* <Route exact path="/" /> */}
          <PrivateRoute exact path='/appointmentA' component={AppointmentA} />
          <PrivateRoute exact path='/appointmentB' component={AppointmentB} />
          <PrivateRoute exact path='/profile' component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
