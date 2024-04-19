import {Route, Redirect} from 'react-router-dom'
import {useAuthValue} from './contex/AuthContext'

export default function PrivateRoute({component:Component, ...rest}) {
  const {currentUser} = useAuthValue()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser? <Component {...props} /> : <Redirect to='/signin' />
    }}>
    </Route>
  )
}