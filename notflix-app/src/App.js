import './index.scss'
import Home from './pages/home/Home'
import Watch from './pages/watch/Watch'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './authContext/authContext'

function App() {

  const {user} = useContext(AuthContext)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/register'>
            {/* Redirect to home if user is signed in */}
            {!user ? <Register /> : <Redirect to='/' />} 
          </Route>
          <Route path='/login'>
            {!user ? <Login /> : <Redirect to='/' />}
          </Route>
          {user ?
            <>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/movies'>
                <Home type="movie" />
              </Route>
              <Route path='/series'>
                <Home type="series" />
              </Route>
              <Route path='/mylist'>
                <Home type="list" />
              </Route>
              <Route path='/watch'>
                <Watch />
              </Route>
            </> :
            <Redirect to='/login' />
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
