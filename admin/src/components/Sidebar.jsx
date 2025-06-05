import React from 'react'
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

const Sidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const {addToast} = useToast()
    const navigate = useNavigate()

    const logoutHandler = ()=> {
      dispatch(logout())
      dispatch(clearAuthState())
      navigate('/login')
      addToast("Logout Admin Successfully", "success", 3000)
      
    }

  return (
    <div className='w-[250px] m-[15px]'>
      {/* Title */}
      <div>
        <h1 className='font-volgue text-[30px] font-[700]'>Raafest</h1>
        <p className='text-[22px] font-[500]'>Admin Dashboard</p>
      </div>
      <div className='flex flex-col gap-[10px] mt-[40px]'>
        {/* Navigation Links */}
        <Link to={'/'} className={`flex items-center gap-[15px] rounded-[8px] p-[15px]  ${location.pathname === "/" ? "bg-primaryColor text-secondaryColor ":""} `}>
        <img src={location.pathname === '/' ? activeCakeItems : cakeItems} alt="Cake Items" className='w-[20px] h-[20px]' />
        <p className='text-[18px] font-light '>Cake Items</p>
        </Link>
        <Link to={'/box-items'} className={`flex items-center gap-[15px] rounded-[8px] p-[15px]  ${location.pathname === "/box-items" ? "bg-primaryColor text-secondaryColor ":""} `}>
        <img src={location.pathname === '/box-items' ? activeBoxItems : boxItems} alt="Cake Items" className='w-[20px] h-[20px]' />
        <p className='text-[18px] font-light '>Box Items</p>
        </Link>
        <Link to={'/card-types'} className={`flex items-center gap-[15px] rounded-[8px] p-[15px]  ${location.pathname === "/card-types" ? "bg-primaryColor text-secondaryColor ":""} `}>
        <img src={location.pathname === '/card-types' ? activeCardTypes : cardTypes} alt="Cake Items" className='w-[20px] h-[20px]' />
        <p className='text-[18px] font-light '>Card Types</p>
        </Link>
        <Link to={'/delivery-options'} className={`flex items-center gap-[15px] rounded-[8px] p-[15px] ${location.pathname === "/delivery-options" ? "bg-primaryColor text-secondaryColor ":""} `}>
        <img src={boxItems} alt="Cake Items" className='w-[20px] h-[20px]' />
        <p className='text-[18px] font-light '>Delivery Option</p>
        </Link><Link to={'/payment-processes'} className={`flex items-center gap-[15px] rounded-[8px] p-[15px]  ${location.pathname === "/payment-processes" ? "bg-primaryColor text-secondaryColor ":""} `}>
        <img src={boxItems} alt="Cake Items" className='w-[20px] h-[20px]' />
        <p className='text-[18px] font-light '>Payment Processes</p>
        </Link>
        <div onClick={logoutHandler} className={`flex items-center gap-[15px] rounded-[8px] p-[15px] cursor-pointer hover:opacity-55 duration-150 transition-opacity border border-primaryColor/10 `}>
          <div>
            <TbLogout2 className='text-[20px]' />
          </div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
