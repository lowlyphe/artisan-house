import React from 'react'
import logo from '../assets/businesscardlogo.png'

export default function Navbar() {
  return (
    <div className='flex justify-between p-6'>
        <div>
            <img src={logo} alt={'artisan house logo'} className={'w-48'}/>
        </div>
        <div className='flex flex-col'>
            <div className='flex'>
                <button>Contact Us</button>
                <p>330-993-0416</p>
            </div>
            <div>
                <ul className='flex'>
                    <li>
                        Home
                    </li>
                    <li>
                        Services
                    </li>
                    <li>
                        Contact Us
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
