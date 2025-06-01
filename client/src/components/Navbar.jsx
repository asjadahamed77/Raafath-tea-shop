import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-[120px] my-[25px] fixed bg-secondaryColor w-full z-10'>
      {/* Logo */}
      <Link to={'/'} className='font-[700] font-volgue text-[30px] py-[8px]'>Raafest</Link>
      {/* Nav Links */}
      <div className='flex items-center gap-[60px] '>
        <Link to='/about' className='py-[16px] text-[18px]'>About</Link>
        <Link to='/contact' className='py-[16px] text-[18px]'>Contact</Link>
        <Link to='/account' className='py-[16px] text-[18px]'>Account</Link>
        <Link to='/craft' className=' flex items-center justify-center'><button className='bg-primaryColor text-secondaryColor px-[30px] py-[16px] rounded-[50px] text-[18px] cursor-pointer'>Craft</button></Link>
      </div>
    </div>
  )
}

export default Navbar
