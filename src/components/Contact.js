import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

export default function Contact({ open, setOpen }) {
  
    const API_URL = process.env.REACT_APP_API_URL


    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(false)
    axios.post(`${API_URL}/api/contact`, {
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value
    })

  };
  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen => !open}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={handleSubmit} method="POST" target="_blank" className='p-2'>
                <div className="mb-3 pt-0">
                    <div>
                        <h2 className='font-bold text-blue-700 pb-2'>Schedule Your Consultation</h2>
                        <p className='text-gray-500 p-2'>At Artisan House, we understand that when taking on a sizeable project you have a lot of options. Talk with us, tell us your vision, and we'll work with you every step of the way until we make it your reality.</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Your name"
                        name="name"
                        ref={nameRef}
                        className="px-3 py-3 w-full placeholder-purple text-gray-600 relative bg-white rounded text-sm border-0  shadow outline-none focus:outline-none focus:ring"
                        required
                    />
                    </div>
                    <div className="mb-3 pt-0">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            ref={emailRef}
                            className="px-3 py-3 w-full placeholder-purple text-gray-600 relative bg-white rounded text-sm border-0  shadow outline-none focus:outline-none focus:ring "
                            required
                            />
                    </div>
                    <div className="mb-3 pt-0">
                        <textarea placeholder="Your message" name="message" ref={messageRef} className="px-3 py-3 w-full placeholder-purple text-gray-600 relative bg-white rounded text-sm border-0  shadow outline-none focus:outline-none focus:ring" required/>
                    </div>
                    <div className="mb-3 pt-0 flex justify-between">
                    <button className="bg-red-300 text-white active:text-black active:bg-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setOpen(false)}>
                            Cancel
                        </button>
                        <button className="bg-blue-700 text-white active:text-black active:bg-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                            Send a message
                        </button>
                    </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}