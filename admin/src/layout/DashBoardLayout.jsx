import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashBoardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar (desktop only) */}
      <div className="hidden md:block fixed top-0 left-0  h-full p-[15px] overflow-y-auto ">
        <Sidebar />
      </div>
      <div className='block md:hidden fixed top-0 left-0 right-0'>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow md:ml-[300px] w-full h-full overflow-y-auto md:py-[30px] px-[10px] md:px-[30px] py-20 pt-28 md:pt-[30px] ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
