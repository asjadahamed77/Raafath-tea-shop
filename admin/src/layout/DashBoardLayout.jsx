import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const DashBoardLayout = () => {
  return (
    <div className='flex '>
      <div className='w-[280px] p-[15px] h-screen'>
        <Sidebar />
      </div>
      <div className='flex-grow p-[15px] h-screen overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashBoardLayout
