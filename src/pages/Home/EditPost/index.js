import React, { useEffect, useState } from 'react'
import { Button, Input } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../../utils/toast'
import {
  fetchUpdatePost,
  fetchDetailPost,
} from '../../../state/post/postActions'
import { useHistory, useParams } from 'react-router-dom'

const EditPost = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const [isLoading, setIsLoading] = useState('')
  const idUser = useSelector((state) => state.auth.idUser)
  const detailPost = useSelector((state) => state.post.detailPost)
  const [description, setDescription] = useState('')
  const handleAddPost = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const dataUpdate = {
      user_id: idUser,
      description,
    }
    try {
      await dispatch(fetchUpdatePost(params.id, dataUpdate))
      setIsLoading(false)
      history.push(`/home/${idUser}`)
    } catch (err) {
      setIsLoading(false)
      showToast('error', err.data.message)
    }
  }

  useEffect(() => {
    setDescription(detailPost.description)
  }, [detailPost])
  useEffect(() => {
    dispatch(fetchDetailPost(params.id))
  }, [dispatch, params.id])

  return (
    <div>
      <h2 className='font-bold text-lg mb-5'>Edit Post</h2>
      <form onSubmit={handleAddPost} className='mt-8'>
        <Input
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='mb-4'
          label='Description'
        />
        <Button isLoading={isLoading} type='submit' className='mt-5'>
          Update
        </Button>
      </form>
    </div>
  )
}

export default EditPost
