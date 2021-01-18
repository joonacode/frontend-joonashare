import React from 'react'
import { IMGAvatar } from '../../assets'

const Avatar = ({ className, src, alt }) => {
  return (
    <>
      <img
        className={className}
        src={src ? src : IMGAvatar}
        alt={alt || 'avatar'}
      />
    </>
  )
}

export default Avatar
