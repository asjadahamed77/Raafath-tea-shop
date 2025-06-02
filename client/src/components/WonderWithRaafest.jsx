import React from 'react'
import forHim from '../assets/box/forHim.png'
import forHer from '../assets/box/forHer.png'
import momsLove from '../assets/box/momsLove.png'
import weddedBliss from '../assets/box/weddedBliss.png'

const WonderWithRaafest = () => {

  const options = [
    {
      _id : "001",
      image: forHim,
      title: "For Him",

    },
    {
      _id : "002",
      image: forHer,
      title: "For Her",
    },
    {
      _id : "003",
      image: momsLove,
      title: "Mom's Love",
    },
    {
      _id : "004",
      image: weddedBliss,
      title: "Wedded Bliss",
    },
  ]

  return (
    <div className='xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 text-center flex flex-col items-center my-16'>
       <h1 className='text-center font-[400] text-[40px] leading-12 sm:text-[60px] font-volgue my-12'>One Click Wonder</h1>
       <h1 className='text-center font-[400] text-[40px] leading-12 sm:text-[60px] font-volgue mt-[-40px] sm:mt-[-25px]'>with Raafest</h1>
       <div className='grid xl:grid-cols-4 sm:grid-cols-2 mt-20 gap-12 '>
        {
          options.map((item,index)=>(
            <div key={index} className='bg-primaryColor w-[267px] h-[323px] flex flex-col items-center justify-center rounded-t-[120px] rounded-b-[20px] box-border'>
            <div className='w-full p-[70px]'>
            <img src={item.image} alt={item.title} className='w-[126px] h-[134px] ' />
            </div>
              <div className='flex items-center justify-center bg-secondaryColor font-volgue  font-light rounded-b-[15px] w-[250px] h-[67px] mb-[16px] box-border py-1'>
              <p className='text-center text-[30px]  '>{item.title}</p>
              </div>
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default WonderWithRaafest
