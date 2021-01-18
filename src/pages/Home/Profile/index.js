import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PostItem } from '../../../components'
import { fetchUserPost } from '../../../state/post/postActions'

const Profile = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const detailUser = useSelector((state) => state.user.detailUser)
  const posts = useSelector((state) => state.post.userPosts)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchUserPost(params.idUser))
    setIsLoading(false)
  }, [dispatch, params.idUser])

  return (
    <>
      <h2 className='font-bold text-lg mb-5'>
        {detailUser.id === params.idUser ? 'My Post' : 'User lain'}
      </h2>
      <div className='grid grid-cols-1 gap-y-16'>
        {isLoading
          ? 'Loading....'
          : posts.length === 0
          ? 'No posts yet'
          : posts.map((post, i) => (
              <div className='col-span-1' key={i}>
                <PostItem data={post} showDelete showEdit />
              </div>
            ))}
      </div>
    </>
  )
}

export default Profile
