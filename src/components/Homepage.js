import React from 'react'
import Gallery from './Gallery'
import hero from '../assets/homepagehome.jpg'
import truck from '../assets/truckWithLogo.png'

export default function Homepage() {
  return (
    <div className='relative flex flex-col items-center pb-12'>
        <img className='sticky top-0 left-0 right-0 w-screen -z-10' src={hero} />
        <div className='flex flex-col  items-center pt-24 bg-white w-full'>
            <div className='flex space-x-24'>
              <div className='text-xl'>
                <h2 className='font-bold'></h2>
                <p className='w-96'><strong>Welcome to Artisan House.</strong> Where you're not only a customer, you're family. We treat you house as if it's our own, and we're here for you every step of the way. Give us a call and let us be the artisans turning your home dreams into reality.</p>
              </div>
              <img src={truck} alt='artisan truck picture' />
            </div>
            <Gallery />
            <div className='flex space-x-24 pt-24'>
              <div>
                <p className='text-xl font-bold text-blue-700'>Ready to discuss your remodeling or building project?</p>
                <p className='text-gray-500'>Call us toll free at 330-993-0416 to discuss your next dream project</p>
              </div>
              <button className='bg-blue-700 p-6 rounded-md text-white font-bold hover:bg-blue-300 hover:text-black'>Contact Us</button>
            </div>
        </div>
        
        
        
    </div>
  )
}
