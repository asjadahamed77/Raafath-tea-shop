import React from 'react'
import hero from '../assets/hero.png'

const Hero = () => {
  return (
    <div className=' xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 my-20'>
      <img src={hero} alt="Hero" className='w-full h-auto' />
    </div>
  )
}

export default Hero
