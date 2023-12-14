import React from 'react'
import Image from 'next/image'
import heroImage1003 from '../../public/assets/heroImage1003.jpg'
const Hero = () => {
  return (
    <div className=' w-auto flex items-center justify-center'>
        <Image src={heroImage1003} height={900} width={740} alt={'hero'} />
    </div>
  )
}

export default Hero;