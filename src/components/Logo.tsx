'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface LogoProps {
  src: string
}

const Logo:React.FC<LogoProps> = ({src}) => {
  const [isOptimized, setIsOptimized] = useState(false)
  const [isloading, setIsloading] = useState(false)
  return (
    <Link href='/'>
        <Image 
          src='https://res.cloudinary.com/dwdkw1a4j/image/upload/v1720469699/productslist/logo/racvswvmivsj7kx8z2ta.png' 
          alt='icon' 
          width={30} 
          height={30}
          unoptimized={!isOptimized}
          onError={()=> setIsOptimized(true)}
          onLoad={()=> setIsloading(true)}
          />
    </Link>
  )
}

export default Logo