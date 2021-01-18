import React, { useState } from 'react'
import { BsHeartFill, BsHeart, BsChat } from 'react-icons/bs'
import { BiTrashAlt, BiPencil } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Avatar, Input } from '..'
import TimeAgo from 'react-timeago'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAddComment,
  fetchDeleteComment,
  fetchDeletePost,
  fetchLikeOrUnlike,
  fetchUserPost,
} from '../../state/post/postActions'
import { showToast } from '../../utils/toast'
import { swalConfirm } from '../../utils/swal'

const PostItem = ({ data, showDelete, showEdit }) => {
  const dispatch = useDispatch()
  const idUser = useSelector((state) => state.auth.idUser)
  const [comment, setComment] = useState('')

  const handleLike = async (postId) => {
    const data = {
      post_id: postId,
      user_id: idUser,
    }
    try {
      await dispatch(fetchLikeOrUnlike(data))
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddComment = async (e, id) => {
    e.preventDefault()
    if (!comment) {
      showToast('error', 'Comment required')
    } else {
      const data = {
        post_id: id,
        user_id: idUser,
        comment,
      }
      try {
        await dispatch(fetchAddComment(data))
        setComment('')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleDeleteComment = (data) => {
    swalConfirm('Delete Comment', 'Are you sure', 'question', async () => {
      try {
        const dataDelete = {
          user_id: idUser,
          post_id: data.post_id,
          comment_id: String(data.id),
        }
        await dispatch(fetchDeleteComment(dataDelete))
      } catch (err) {
        console.log(err)
      }
    })
  }
  const handleDeletePost = (id) => {
    swalConfirm('Delete Post', 'Are you sure', 'question', async () => {
      try {
        await dispatch(fetchDeletePost(id))
        await dispatch(fetchUserPost(idUser))
        showToast('success', 'Delete success')
      } catch (err) {
        console.log(err)
      }
    })
  }

  const checkLikes = (likes, id) => {
    const like = likes.filter((like) => like.user_id === id)
    return like.length === 0 ? false : true
  }

  return (
    <div className='bg-white shadow-sm rounded-lg'>
      <div className='flex items-center justify-between px-5 py-3'>
        <div className='flex items-center'>
          <Avatar
            src={data.profileUser}
            className='h-10 w-10 rounded-full border'
          />
          <span className='ml-3 font-bold text-sm'>{data.username}</span>
        </div>
        <div className='flex items-center'>
          {showDelete && data.user_id === idUser ? (
            <button
              type='button'
              className='p-2 focus:outline-none bg-red-500 text-white rounded'
              onClick={() => handleDeletePost(data.id)}
            >
              <BiTrashAlt />
            </button>
          ) : (
            ''
          )}
          {showEdit && data.user_id === idUser ? (
            <Link
              to={`/home/edit-post/${data.id}`}
              className='p-2 ml-2 focus:outline-none bg-green-500 text-white rounded'
            >
              <BiPencil />
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <img src={data.image} className='w-full' alt='awiw' />
      <div className='px-5 py-5'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <span
              className='text-2xl cursor-pointer mr-2'
              onClick={() => handleLike(data.id)}
            >
              {checkLikes(data.likes, idUser) ? (
                <BsHeartFill color='red' />
              ) : (
                <BsHeart />
              )}
            </span>
            <span className='font-bold text-sm'>{data.total_likes} likes</span>
          </div>
          <div className='flex cursor-pointer'>
            <span className='text-2xl'>
              <BsChat />
            </span>
            <span className='text-sm items-end ml-2 font-bold'>
              {data.total_comments}
            </span>
          </div>
        </div>
        <p className='text-sm'>
          <Link
            to={`/home/${data.userId}`}
            className='font-bold hover:underline mr-2'
          >
            {data.username}
          </Link>
          {data.description}
        </p>
        <div className='mt-4'>
          {data.comments.map((comment, i) => (
            <div className='flex justify-between' key={i}>
              <p className='text-sm'>
                <Link
                  to={comment.user_id}
                  className='font-bold hover:underline'
                >
                  {comment.username}
                </Link>
                <span className='ml-1'>{comment.comment}</span>
              </p>
              <div className='flex items-center'>
                <span className='text-xs'>
                  <TimeAgo date={comment.created_at} />
                </span>
                {comment.user_id === idUser && (
                  <span
                    className='cursor-pointer ml-2'
                    onClick={() => handleDeleteComment(comment)}
                  >
                    <BiTrashAlt />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => handleAddComment(e, data.id)}>
          <Input
            placeholder='Comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='w-full mt-4'
          />
        </form>
      </div>
    </div>
  )
}

export default PostItem
