import React from 'react'
import { Link } from 'react-router-dom'
import { BiHomeAlt, BiUser, BiHeart, BiSearch } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const detailUser = useSelector((state) => state.user.detailUser)
  return (
    <div className='shadow-sm bg-white sticky top-0'>
      <div className='container mx-auto px-32 py-4'>
        <div className='flex items-center relative justify-between'>
          <Link to='/' className='font-bold text-xl'>
            Joona Share
          </Link>
          <div className='flex items-center'>
            <Link to='/' className='text-2xl mr-5'>
              <BiHomeAlt />
            </Link>
            <Link to='/' className='text-2xl mr-5'>
              <BiSearch />
            </Link>
            <Link to='/' className='text-2xl mr-5'>
              <BiHeart />
            </Link>

            <Link
              to={`/home/${detailUser.id}`}
              className='text-2xl border rounded-full'
            >
              {detailUser.foto_profile ? (
                <img
                  src={detailUser.foto_profile}
                  className='w-7 h-7 rounded-full'
                  alt='profile'
                />
              ) : (
                <BiUser />
              )}
            </Link>
          </div>
          {/* <input
            type='text'
            className='border w-64 left-96 absolute px-4 py-1 text-sm rounded text-gray-700 focus:outline-none outline-none focus:border-gray-300'
            placeholder='Search'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
