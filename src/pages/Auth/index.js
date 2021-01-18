import React from 'react'
import Login from './Login'
import Register from './Register'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import { IMGWelcome } from '../../assets'

const Auth = () => {
  const { path } = useRouteMatch()
  // const history = useHistory()
  // useEffect(() => {
  //   history.push('/auth/login')
  // }, [history])
  return (
    <div className='min-h-screen w-full h-full flex bg-white'>
      <div className='flex-grow md:flex hidden items-center justify-center p-10 bg-gray-100'>
        <img src={IMGWelcome} className='w-full lg:px-28 px-5' alt='welcome' />
      </div>
      <div className='lg:w-5/12 md:w-6/12 w-full flex flex-none items-center justify-center relative flex-col p-10'>
        <h1 className='text-2xl font-bold b-10 absolute top-16 left-10'>
          Joona Share
        </h1>
        <div className='shadow-sm border rounded-lg w-full p-5 mt-16'>
          <Switch>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/register`} component={Register} />
            <Route path={`${path}`}>
              <Redirect to='/auth/login' />
            </Route>
            <Route>
              <Redirect to='/auth/login' />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Auth
