import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail';
import Login from './pages/Login'
import { AuthProvider } from './contex/AuthContext'
import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import AppointmentA from './pages/AppointmentA'
import AppointmentB from './pages/AppointmentB'
import HomePage from './pages/HomePage';

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
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path='/verify-email' component={VerifyEmail} />
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path='/appointmentA' component={AppointmentA} />
          <PrivateRoute exact path='/appointmentB' component={AppointmentB} />
          <PrivateRoute exact path='/profile' component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
