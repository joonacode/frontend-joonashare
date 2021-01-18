import React, { useState } from 'react'
import { Button, Input } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../../utils/toast'
import { fetchAddPost } from '../../../state/post/postActions'
import { useHistory } from 'react-router-dom'

const CreatePost = () => {
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const idUser = useSelector((state) => state.auth.idUser)

  const handleAddPost = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    if (image) {
      if (image.size > 2097152) {
        setIsLoading(false)
        return showToast('error', 'Max file size 2MB')
      }
    }
    formData.append('image', image)

    formData.append('description', description)
    formData.append('user_id', idUser)
    try {
      await dispatch(fetchAddPost(formData))
      setIsLoading(false)
      history.push(`/home/${idUser}`)
    } catch (err) {
      setIsLoading(false)
      showToast('error', err.data.message)
    }
  }

  return (
    <div>
      <h2 className='font-bold text-lg mb-5'>Create Post</h2>
      <form onSubmit={handleAddPost} className='mt-8'>
        <Input
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='mb-4'
          label='Description'
        />
        <Input
          type='file'
          label='Image'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button isLoading={isLoading} type='submit' className='mt-5'>
          Add
        </Button>
      </form>
    </div>
  )
}

export default CreatePost
