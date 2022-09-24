import React, { useState, useEffect } from 'react'
import logo from '../assets/businesscardlogo.png'

export default function Navbar() {

    const [stickyClass, setStickyClass] = useState('relative');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 135 ? setStickyClass('fixed top-0 left-0 z-50 w-screen') : setStickyClass('relative');
    }
  };

  return (
    <div className={`flex justify-center p-6 py-0 bg-blue-700 ${stickyClass} drop-shadow-lg`}>
        <ul className='flex text-white text-xl'>
            <li className='px-4 py-2'>
                <a className='hover:text-black' href={'#'}>Home</a>
            </li>
            <li className='px-4 py-2'>
                <a className='hover:text-black' href={'#'}>Services</a>
            </li>
            <li className='px-4 py-2'>
                <a className='hover:text-black' href={'#'}>Contact Us</a>
            </li>
        </ul>
    </div>
  )
}
