import React, { useState } from 'react'
import cakeItems from '../assets/icons/cake-items.png'
import cardTypes from '../assets/icons/card-types.png'
import activeCakeItems from '../assets/icons/active-cake-items.png'
import activeBoxItems from '../assets/icons/active-box-items.png'
import activeCardTypes from '../assets/icons/active-card-types.png'
import boxItems from '../assets/icons/box-items.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from 'react-redux'
import { clearAuthState, logout } from '../redux/slices/authSlice'
import { useToast } from '../context/ToastContext'
import { MdOutlineShoppingCart, MdOutlinePeople, MdMenu, MdClose } from 'react-icons/md'

const Sidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const {addToast} = useToast()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const logoutHandler = ()=> {
      dispatch(logout())
      dispatch(clearAuthState())
      navigate('/login')
      addToast("Logout Admin Successfully", "success", 3000)
    }

    const toggleSidebar = () => {
      setIsOpen(!isOpen)
    }

    const menuItems = [
      { path: '/', icon: location.pathname === '/' ? activeCakeItems : cakeItems, label: 'Cake Items' },
      { path: '/box-items', icon: location.pathname === '/box-items' ? activeBoxItems : boxItems, label: 'Box Items' },
      { path: '/card-types', icon: location.pathname === '/card-types' ? activeCardTypes : cardTypes, label: 'Card Types' },
      { path: '/orders', icon: <MdOutlineShoppingCart className='w-[20px] h-[20px]' />, label: 'Orders' },
      { path: '/users', icon: <MdOutlinePeople className='w-[20px] h-[20px]' />, label: 'Users' },
    ]

    const SidebarContent = () => (
      <div className='bg-secondaryColor h-screen p-6'>
      {/* Title */}
        <div className='mb-8'>
        <h1 className='font-volgue text-[30px] font-[700]'>Raafest</h1>
        <p className='text-[22px] font-[500]'>Admin Dashboard</p>
      </div>
        <div className='flex flex-col gap-[10px]'>
        {/* Navigation Links */}
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-[15px] rounded-[8px] p-[15px] ${
                location.pathname === item.path ? "bg-primaryColor text-secondaryColor" : ""
              }`}
            >
              {typeof item.icon === 'string' ? (
                <img src={item.icon} alt={item.label} className='w-[20px] h-[20px]' />
              ) : (
                item.icon
              )}
              <p className='text-[18px] font-light'>{item.label}</p>
        </Link>
          ))}
          <div 
            onClick={logoutHandler} 
            className='flex items-center gap-[15px] rounded-[8px] p-[15px] cursor-pointer hover:opacity-55 duration-150 transition-opacity border border-primaryColor/10'
          >
          <div>
            <TbLogout2 className='text-[20px]' />
          </div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )

    return (
      <>
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primaryColor text-white"
        >
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>

        {/* Sidebar */}
        <div className={`
          fixed lg:static top-0 left-0 h-screen bg-secondaryColor z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-[250px]
        `}>
          <SidebarContent />
        </div>

        {/* Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </>
    )
}

export default Sidebar
