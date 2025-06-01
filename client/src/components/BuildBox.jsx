import React from 'react'
import img1 from '../assets/box/hero1.svg'
import img2 from '../assets/box/hero2.svg'
import img3 from '../assets/box/hero3.svg'
import img4 from '../assets/box/hero4.svg'
import { Link } from 'react-router-dom'

const BuildBox = () => {
    const box = [
        {
            boxImage: img1 ,
            boxNo: "01",
            boxTitle: "Pick a Cake",
            boxDesc: "Choose your favorite cake design from our delicious collection."
        },
        {
            boxImage: img2,
            boxNo: "02",
            boxTitle: "Add to Box",
            boxDesc: "Select the perfect box to match your celebration style."
        },
        {
            boxImage: img3,
            boxNo: "03",
            boxTitle: "Write a Card",
            boxDesc: "Choose your favorite cake design from our delicious collection."
        },
        {
            boxImage: img4,
            boxNo: "04",
            boxTitle: "Send It Off",
            boxDesc: "Pick up, deliver, or surprise someone with your order."
        },
    ]
  return (
    <div id='buildBox' className='xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 text-center flex flex-col items-center'>
        <h1 className='text-center font-[400] text-[45px] leading-12 sm:text-[60px] font-volgue my-12'>How to Build your Box</h1>
     <div className='grid xl:grid-cols-4 sm:grid-cols-2 mt-12 gap-20'>
     {
        box.map((item,index)=>(
            <div key={index} className='flex flex-col items-center justify-center w-[270px]'>
                {/* Image and Number */}
                <div className='flex items-center justify-center relative rounded-[30px] w-[270px] h-[270px] aspect-square border-[2px] border-primaryColor'>
                    <img src={item.boxImage} alt={item.boxTitle} />
                    <p className='absolute -top-15 font-[400] text-[70px] font-volgue'>{item.boxNo}</p>
                </div>
                <p className='font-[400] text-[45px] font-volgue mt-8'>{item.boxTitle}</p>
                <p className='text-center text-[18px] font-light mt-2'>{item.boxDesc}</p>
            </div>
        ))
      }
     </div>
     <Link   onClick={() => window.scrollTo(0, 0)}  to={'/box'} className='mt-20 w-fit py-[16px] px-[50px] text-[18px] font-light bg-primaryColor text-secondaryColor rounded-full cursor-pointer duration-300 hover:opacity-75 transition-opacity'>Build a Box</Link>
    </div>
  )
}

export default BuildBox
