import React, { useState, useEffect } from 'react'

export default function Navbar({ open, setOpen }) {

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
                Whole Home
            </li>
            <li className='px-4 py-2'>
                Kitchens
            </li>
            <li className='px-4 py-2'>
                Bathrooms
            </li>
            <li className='px-4 py-2'>
                Exterior
            </li>
            <li className='px-4 py-2'>
                Landscaping
            </li>
            <li className='px-4 py-2'>
                Basements
            </li>
            <li className='px-4 py-2'>
                <button className='hover:text-black' onClick={() => setOpen(open => !open)}>Contact Us</button>
            </li>
        </ul>
    </div>
  )
}
