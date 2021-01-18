import React, { useState } from 'react'
import { Button, InputMessage } from '../../../components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { fetchLogin } from '../../../state/auth/authActions'
import { showToast } from '../../../utils/toast'

const Login = () => {
  const validationSchame = Yup.object({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().required('Password required'),
  })
  const initialValues = {
    email: '',
    password: '',
  }
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      await dispatch(fetchLogin(values))
      showToast('success', 'Login success')
      setIsLoading(false)
      history.push('/home')
    } catch (err) {
      showToast('error', err.data.message)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className='text-xl mb-2 font-bold'>Login</h2>
      <p className='opacity-70 text-sm'>Please login to your account</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchame}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form className='mt-5 mb-4'>
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
            Login
          </Button>
        </Form>
      </Formik>
      <p className='text-sm'>
        Dont have account ?{' '}
        <Link className='underline' to='/auth/register'>
          Register
        </Link>
      </p>
    </div>
  )
}

export default Login
