import React, { useEffect, useState } from 'react'
import { Navbar, Avatar } from '../../components'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchAllPost } from '../../state/post/postActions'
import { fetchAllUser, fetchDetailUser } from '../../state/user/userActions'
import jwt_decode from 'jwt-decode'
import { getIdUser } from '../../state/auth/authActions'

import { swalConfirm } from '../../utils/swal'
import { logoutAction } from '../../state/auth/authActions'
import { useHistory } from 'react-router-dom'
import { showToast } from '../../utils/toast'

import Main from './Main'
import Profile from './Profile'
import CreatePost from './CreatePost'
import EditPost from './EditPost'

const Home = () => {
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useSelector((state) => state.auth)
  const detailUser = useSelector((state) => state.user.detailUser)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    swalConfirm('Logout', 'Are you sure want to logout', 'question', () => {
      dispatch(logoutAction())
      showToast('success', 'Logout success')
      history.push('/auth/login')
    })
  }

  useEffect(() => {
    try {
      const decoded = jwt_decode(token)
      dispatch(getIdUser(decoded.data))
    } catch (err) {
      console.log(err)
    }
  }, [token, dispatch])

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchAllPost())
    dispatch(fetchAllUser())
    dispatch(fetchDetailUser())
    setIsLoading(false)
  }, [dispatch])
  return (
    <div className='bg-gray-100 bg-opacity-50 min-h-screen'>
      <Navbar />
      {isLoading ? (
        'Loading'
      ) : (
        <>
          <div className='container mx-auto px-32 mt-10 pb-20'>
            <div className='grid grid-cols-6 gap-x-8'>
              <div className='col-span-4'>
                <Switch>
                  <Route path={`${path}/create-post`} component={CreatePost} />
                  <Route path={`${path}/edit-post/:id`} component={EditPost} />
                  <Route path={`${path}/:idUser`} exact component={Profile} />
                  <Route path={`${path}`} component={Main} />
                </Switch>
              </div>
              <div className='col-span-2'>
                <div className='sticky top-24'>
                  <div className='flex items-center justify-between'>
                    <div className='flex'>
                      <Avatar
                        src={detailUser.foto_profile}
                        className='h-16 w-16 rounded-full border'
                      />
                      <span className='ml-3 mt-2 font-bold text-sm'>
                        {detailUser.username}
                      </span>
                    </div>
                    <span
                      className='text-sm underline cursor-pointer'
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </div>
                  <Link
                    to='/home/create-post'
                    className='bg-purple-500 mt-10 block text-white px-4 py-2 rounded'
                  >
                    Create new post
                  </Link>
                  <div className='mt-20'>
                    <p className='text-sm opacity-40'>
                      copyright &copy; {new Date().getFullYear()} joona share
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
