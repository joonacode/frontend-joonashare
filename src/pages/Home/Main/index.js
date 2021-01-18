import React from 'react'
import { PostItem } from '../../../components'
import { useSelector } from 'react-redux'

const Main = () => {
  const posts = useSelector((state) => state.post.posts)

  return (
    <div className='col-span-4'>
      <div className='flex flex-col space-y-16'>
        {posts.map((post, i) => (
          <PostItem data={post} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Main
