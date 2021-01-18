import React from 'react'

const Input = ({
  type,
  withLabel,
  className,
  value,
  onChange,
  placeholder,
  label,
  ...rest
}) => {
  const baseClassName = [
    'border w-full px-4 py-2 text-sm rounded text-gray-700 focus:outline-none outline-none focus:border-gray-300',
  ]
  if (className) baseClassName.push(className)

  if (label) {
    return (
      <>
        <labe className='inline-block mb-2 text-sm pl-1'>{label}</labe>
        <input
          type={type || 'text'}
          className={`${baseClassName.join(' ')}`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          {...rest}
        />
      </>
    )
  }

  return (
    <>
      <input
        type={type || 'text'}
        className={`${baseClassName.join(' ')}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </>
  )
}

export default Input
