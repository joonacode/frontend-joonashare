import React from 'react'

const Button = ({ type, className, isLoading, children }) => {
  const baseClassName = [
    'px-4 py-2 text-sm bg-gray-500 rounded shadow text-white focus:outline-none hover:opacity-80',
  ]
  if (className) baseClassName.push(className)

  if (isLoading) {
    return (
      <>
        <span className={`${baseClassName.join(' ')}`}>Loading..</span>
      </>
    )
  }

  return (
    <>
      <button type={type || 'button'} className={`${baseClassName.join(' ')}`}>
        {children}
      </button>
    </>
  )
}

export default Button
