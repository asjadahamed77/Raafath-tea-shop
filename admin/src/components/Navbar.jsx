import React, { useState } from 'react';
import { RiMenu3Line } from "react-icons/ri";
import cakeItems from '../assets/icons/cake-items.png';
import cardTypes from '../assets/icons/card-types.png';
import activeCakeItems from '../assets/icons/active-cake-items.png';
import activeBoxItems from '../assets/icons/active-box-items.png';
import activeCardTypes from '../assets/icons/active-card-types.png';
import boxItems from '../assets/icons/box-items.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { useToast } from '../context/ToastContext';
import { clearAuthState, logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearAuthState());
    navigate('/login');
    addToast("Logout Admin Successfully", "success", 3000);
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      {/* Top bar */}
      <div className='flex justify-between items-center bg-secondaryColor py-4 px-6 border-b mb-2'>
        <div className='flex flex-col '>
          <p className='text-2xl font-[700] font-volgue'>Raafest</p>
          <p className='text-sm font-[500]'>Admin Dashboard</p>
        </div>
        <RiMenu3Line
          className='text-2xl cursor-pointer'
          onClick={() => setMenuOpen(true)}
        />
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sliding Bottom Menu */}
      <div
        className={`fixed z-100 bottom-0 left-0 w-full bg-secondaryColor p-6 rounded-t-xl shadow-xl transition-transform duration-300 ${
          menuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='flex flex-col gap-[10px]'>
          <Link to={'/'} onClick={handleLinkClick} className={`flex items-center gap-[15px] rounded-[8px] p-[15px] ${location.pathname === "/" ? "bg-primaryColor text-secondaryColor" : ""}`}>
            <img src={location.pathname === '/' ? activeCakeItems : cakeItems} alt="Cake Items" className='w-[20px] h-[20px]' />
            <p className='text-[18px] font-light'>Cake Items</p>
          </Link>
          <Link to={'/box-items'} onClick={handleLinkClick} className={`flex items-center gap-[15px] rounded-[8px] p-[15px] ${location.pathname === "/box-items" ? "bg-primaryColor text-secondaryColor" : ""}`}>
            <img src={location.pathname === '/box-items' ? activeBoxItems : boxItems} alt="Box Items" className='w-[20px] h-[20px]' />
            <p className='text-[18px] font-light'>Box Items</p>
          </Link>
          <Link to={'/card-types'} onClick={handleLinkClick} className={`flex items-center gap-[15px] rounded-[8px] p-[15px] ${location.pathname === "/card-types" ? "bg-primaryColor text-secondaryColor" : ""}`}>
            <img src={location.pathname === '/card-types' ? activeCardTypes : cardTypes} alt="Card Types" className='w-[20px] h-[20px]' />
            <p className='text-[18px] font-light'>Card Types</p>
          </Link>
          <Link to={'/delivery-options'} onClick={handleLinkClick} className={`flex items-center gap-[15px] rounded-[8px] p-[15px] ${location.pathname === "/delivery-options" ? "bg-primaryColor text-secondaryColor" : ""}`}>
            <img src={boxItems} alt="Delivery Options" className='w-[20px] h-[20px]' />
            <p className='text-[18px] font-light'>Delivery Options</p>
          </Link>
          <Link to={'/payment-processes'} onClick={handleLinkClick} className={`flex items-center gap-[15px] rounded-[8px] p-[15px] ${location.pathname === "/payment-processes" ? "bg-primaryColor text-secondaryColor" : ""}`}>
            <img src={boxItems} alt="Payment Processes" className='w-[20px] h-[20px]' />
            <p className='text-[18px] font-light'>Payment Processes</p>
          </Link>
          <div onClick={logoutHandler} className='flex items-center gap-[15px] rounded-[8px] p-[15px] cursor-pointer hover:opacity-55 transition-opacity border border-primaryColor/10'>
            <TbLogout2 className='text-[20px]' />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
