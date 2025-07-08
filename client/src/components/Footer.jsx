import React from "react";
import fbLogo from '../assets/icons/fb.svg'
import instaLogo from '../assets/icons/insta.svg'

const Footer = () => {
  return (
    <div className="border-t xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4  pt-16">
     <div className="grid gap-20 sm:gap-0 sm:flex justify-between">
     <div>
        <h1 className="text-[57px] font-[700] font-volgue">Raafest</h1>
        <p className="font-volgue text-[20px] font-light -mt-4">
          Select, Style, Surprise
        </p>
      </div>
      <div className="grid sm:flex sm:gap-32 gap-20">
        {/* Location */}
        <div>
          <p className="text-[25px] font-[500]">Locate us</p>
          <p className="text-[18px] font-light leading-6 mt-[24px]">
           Samanalawewa Road,
            <br /> 
            Belihuloya, Sri Lanka
          </p>
        </div>
        {/* Aboot */}
        <div>
          <p className="text-[25px] font-[500]">About</p>
          <div className="flex flex-col gap-[24px] mt-[24px]">
            <a href="#" className="text-[18px] font-light leading-6 hover:opacity-75 duration-300 transition-opacity">
              About us
            </a>
            <a href="#" className="text-[18px] font-light leading-6 hover:opacity-75 duration-300 transition-opacity">
              Contact us
            </a>
          </div>
        </div>
        {/* Shop */}
        <div>
        <p className="text-[25px] font-[500]">Shop</p>
        <div className="flex flex-col gap-[24px] mt-[24px]">
            <a href="#" className="text-[18px] font-light leading-6 hover:opacity-75 duration-300 transition-opacity">
              For Him
            </a>
            <a href="#" className="text-[18px] font-light leading-6 hover:opacity-75 duration-300 transition-opacity">
              For Her
            </a>
            <a href="#" className="text-[18px] font-light leading-6 hover:opacity-75 duration-300 transition-opacity">
              Mom's Love
            </a>
            <a href="#" className="text-[18px] font-light leading-6 hover:opacity-75 duration-300 transition-opacity">
              Wedded Bliss
            </a>
            <a href="#" className="text-[18px] font-light leading-6 hover:opacity-75 duration-300 transition-opacity">
              Build a Box
            </a>
          </div>
        </div>
      </div>
     </div>
      <div className="flex flex-col items-center text-center mt-20">
        <div className="flex items-center justify-center gap-[40px]">
    <a href="#"><img src={fbLogo} alt="fb" className="w-[33px] h-[34px] hover:opacity-75 duration-300 transition-opacity" /></a>
    <a href="#"><img src={instaLogo} alt="insta" className="w-[33px] h-[34px] hover:opacity-75 duration-300 transition-opacity"  /></a>
        </div>
        <p className="font-light text-[18px] my-[20px]">Copyright © 2025 All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
