import React from 'react'
import logo from '@/assets/pngaaa.com-995389.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function nav() {
  return (
    <div className='w-full h-[100px] shadow bg-white flex flex-row justify-between items-center px-10 fixed top-0 z-50'>
        <div className="flex flex-row items-center justify-center gap-2 h-full">
          <Image src={logo} alt="Logo" width={70} height={70} />
          <div className='flex flex-col items-start justify-center'>
            <h2 className='font-bold font-lex text-[25px] text-accent  '>LAUTECH</h2>
            <p className='font-inter font-light text-[8px] text-secondary '>Ladoke Akintola University Of Technology </p>
          </div>
        </div>


        <div className=' border-[1px] px-20 py-3 rounded-3xl  bg-accent  '>
            <ul className='flex flex-row justify-center text-white z-15 gap-15'>
                <li>

                     <Link href="/dashboard">
                        School  
                    </Link>
                </li>

                  <li>

                     <Link href="/E-portal">
                        E-Portal   
                    </Link>
                </li>


                  <li>

                     <Link href="/Resources">
                        Resources   
                    </Link>
                </li>

                  <li>

                     <Link href="/About us">
                        About Us
                    </Link>
                </li>
            </ul>
        </div>

        <div  className='flex flex-row gap-2'>
           <Button variant="default" className='text-accent bg-transparent hover:bg-accent hover:text-white border-1 border-accent'>
                Login
           </Button>

           <Button  variant="secondary">
            Apply Now
           </Button>
        </div>
        </div>
    
  )
}
