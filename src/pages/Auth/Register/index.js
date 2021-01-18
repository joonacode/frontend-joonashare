import React, { useState } from 'react'
import { Button, InputMessage } from '../../../components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { fetchRegister } from '../../../state/auth/authActions'
import { showToast } from '../../../utils/toast'

const Register = () => {
  const validationSchame = Yup.object({
    name: Yup.string().required('Name required'),
    username: Yup.string().required('Username required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(6, 'Min length 6').required('Password required'),
  })
  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
  }
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      await dispatch(fetchRegister(values))
      showToast('success', 'Register success, please login!')
      setIsLoading(false)
      history.push('/auth/login')
    } catch (err) {
      showToast('error', err.data.message)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className='text-xl mb-2 font-bold'>Register</h2>
      <p className='opacity-70 text-sm'>Let's goooo join to Joona Share</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchame}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form className='mt-5 mb-4'>
          <ErrorMessage name='name' component={InputMessage} />
          <Field name='name' className='base-input mb-3' placeholder='Name' />
          <ErrorMessage name='username' component={InputMessage} />
          <Field
            name='username'
            className='base-input mb-3'
            placeholder='Username'
          />
          <ErrorMessage name='email' component={InputMessage} />
          <Field name='email' className='base-input mb-3' placeholder='Email' />
          <ErrorMessage name='password' component={InputMessage} />
          <Field
            type={`password`}
            name='password'
            className='base-input mb-4'
            placeholder='Password'
          />
          <Button type='submit' isLoading={isLoading} className='bg-purple-500'>
            Register
          </Button>
        </Form>
      </Formik>
      <p className='text-sm'>
        Already have account ?{' '}
        <Link className='underline' to='/auth/login'>
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
