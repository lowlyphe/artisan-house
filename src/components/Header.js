import React from 'react'
import logo from '../assets/businesscardlogo.png'
import insured from '../assets/insured.png'

export default function Header() {
  return (
    <div className='flex justify-between p-6 items-center '>
        <img src={logo} alt={'artisan house logo'} className='w-48'/>
        <p className='hidden md:flex text-2xl font-bold'>+1 330-993-0416</p>        
        <p className='hidden md:flex text-2xl font-bold'>ArtisanHousellc@yahoo.com</p> 
        <img src={insured} alt={'fully insured'} className='w-24' />
    </div>
  )
}
