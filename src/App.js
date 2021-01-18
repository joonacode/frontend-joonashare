import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
export const history = createBrowserHistory()

function App() {
  const token = useSelector((state) => state.auth.token)
  useEffect(() => {}, [token])
  return (
    <div className='text-gray-700'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router history={history}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/auth/login' />
          </Route>
          <Route path='/home'>
            {!token ? <Redirect to='/auth/login' /> : <Home />}
          </Route>
          <Route path='/auth'>
            {token ? <Redirect to='/home' /> : <Auth />}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
