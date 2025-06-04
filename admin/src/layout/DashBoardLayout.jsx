import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar (desktop only) */}
      <div className="hidden md:block fixed top-0 left-0  h-full p-[15px] overflow-y-auto ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow md:ml-[300px] w-full h-full overflow-y-auto py-[30px] px-[10px] md:px-[30px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
