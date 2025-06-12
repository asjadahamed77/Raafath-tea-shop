import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className='flex items-center justify-between xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 lg:my-[25px] my-[15px] fixed bg-secondaryColor w-full z-20'>
      {/* Logo */}
      <Link to='/' className='font-[700] font-volgue text-[30px] py-[8px] cursor-pointer'>Raafest</Link>

      {/* Desktop Nav Links */}
      <div className='hidden lg:flex items-center gap-[60px]'>
        <Link to='/about' className='py-[16px] text-[18px] hover:opacity-80 duration-300 transition-opacity'>About</Link>
        <Link to='/contact' className='py-[16px] text-[18px] hover:opacity-80 duration-300 transition-opacity'>Contact</Link>
        <Link to={user ? '/account' : "/login"} className='py-[16px] text-[18px] hover:opacity-80 duration-300 transition-opacity'>Account</Link>
        <Link to='/box' className='flex items-center justify-center hover:opacity-80 duration-300 transition-opacity'>
          <button className='bg-primaryColor font-light text-secondaryColor px-[30px] py-[16px] rounded-[50px] text-[18px] cursor-pointer'>Craft</button>
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div onClick={toggleMobileMenu} className='lg:hidden block z-30'>
        {mobileMenuOpen ? <IoClose className='text-3xl' /> : <HiOutlineMenuAlt3 className='text-3xl' />}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed bottom-0 left-0 w-full h-screen bg-secondaryColor flex flex-col items-center justify-center gap-10 text-[20px] z-20 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <Link to='/about' onClick={toggleMobileMenu}>About</Link>
        <Link to='/contact' onClick={toggleMobileMenu}>Contact</Link>
        <Link to={user ? '/account' : "/login"}  onClick={toggleMobileMenu}>Account</Link>
        <Link to='/box' onClick={toggleMobileMenu}>
          <button className='bg-primaryColor font-light text-secondaryColor px-[30px] py-[16px] rounded-[50px] text-[18px] cursor-pointer'>Craft</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
