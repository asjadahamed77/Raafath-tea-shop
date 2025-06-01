import React, { useState } from 'react'
import boxImage from '../assets/box/box.png'

const Box = () => {
    const box = [
        {
            id: "001",
            boxName: 'Box Name',
            boxPrice: 'LKR 1000',
            boxImage: boxImage,
        },
        {
            id: "002",
            boxName: 'Box Name',
            boxPrice: 'LKR 1000',
            boxImage: boxImage,
        },
        {
            id: "003",
            boxName: 'Box Name',
            boxPrice: 'LKR 1000',
            boxImage: boxImage,
        },
        {
            id: "004",
            boxName: 'Box Name',
            boxPrice: 'LKR 1000',
            boxImage: boxImage,
        },
        {
            id: "005",
            boxName: 'Box Name',
            boxPrice: 'LKR 1000',
            boxImage: boxImage,
        },
        {
            id: "006",
            boxName: 'Box Name',
            boxPrice: 'LKR 1000',
            boxImage: boxImage,
        },
    ]

    const [boxSelected, setBoxSelected] = useState(null);

    const handleBoxSelect = (index) => {
        setBoxSelected(index);
    }

    return (
        <div className='xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 py-20 flex flex-col items-center text-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-center font-[400] text-[45px] leading-12 sm:text-[60px] font-volgue my-12'>Choose your Box</h1>
                <p className='w-[80%] text-center font-light leading-6 mt-[-30px] text-[18px]'>
                    Choose from our stylish and elegant boxes, each handmade to enhance the unboxing experience and make your gift look extra special. Every single box is crafted with attention to detail to ensure a memorable presentation.
                </p>
            </div>

            <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-12 my-20 place-items-center w-fit'> 
                {box.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => handleBoxSelect(index)}
                        className={`lg:w-[370px] h-[435px] flex flex-col items-center rounded-[30px] shadow-[4px_4px_14px_0]/30 hover:shadow-[4px_4px_14px_0]/70 cursor-pointer  ${
                            boxSelected === index ? "border-[1px] border-primaryColor" : ""
                        }`}
                    >
                        <div className='min-w-[286px] min-h-[286px]'>
                            <img src={item.boxImage} alt={item.boxName} className='w-full h-full p-8 aspect-square' />
                        </div>
                        <p className='text-[18px] font-light'>{item.boxName}</p>
                        <p className='text-[18px] font-light'>{item.boxPrice}</p>
                    </div>
                ))}
            </div>
            <div className='flex flex-col items-center gap-6 mt-8'>
                <button className='bg-primaryColor rounded-full px-28 sm:px-32 py-4 text-secondaryColor text-sm sm:text-base hover:opacity-75 transition-opacity duration-300 cursor-pointer'>Next</button>
                <button  className='bg-transparent rounded-full px-28 sm:px-32 py-4 text-primaryColor border-[2px] text-sm sm:text-base hover:bg-primaryColor hover:text-secondaryColor transition-opacity duration-300 cursor-pointer'>Back</button>
            </div>
        </div>
    )
}

export default Box
