'use client'
import React, { useState } from 'react'
import bpplogo from '../assets/bpplogo.png';
import bpplogoname from '../assets/bpplogoname.png';
import bppmic from '../assets/bppmic.png';
import { Dialog, DialogPanel } from '@headlessui/react'
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    
  return (
<header className="sticky top-0 z-50 w-full border-b bg-white">
  <nav>
    <div className="max-w-full mx-auto">
      <div className="flex mx-auto justify-between w-5/6">
        {/* Primary menu and logo */}
        <div className="flex items-center gap-24 my-5"> {/* Increased gap */}
          {/* Logo */}
          <div>
            <a
              href="/"
            className="flex gap-3 font-bold text-black-700 items-center"
            >
             <img src={bppmic} width={25} height={25}/>
              <span className='poppins-regular font-black text-lg  lg:text-2xl'>BHARATIYA POPULAR PARTY</span>
            </a>
          </div>
          {/* Primary menu */}
          <div className="hidden lg:flex gap-8">
            <a href="#" className="">
              Enroll
            </a>
            <a href="#">Vision</a>
            <a href="#">Our Mission</a>
          </div>
        </div>
        {/* Secondary */}
        <div className="flex gap-6">
          {/* Mobile navigation toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setToggleMenu(!toggleMenu)}>
              <Bars3Icon className="h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Mobile navigation */}
    <div
      className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700 ${
        !toggleMenu ? "h-0" : "h-full"
      }`}
    >
      <div className="px-8 mt-6">
        <div className="flex flex-col gap-8 font-bold tracking-wider">
          <a href="#" className="border-l-4 border-gray-600">
            Enroll
          </a>
          <a href="#">Vision</a>
          <a href="#">Our Mission</a>
        </div>
      </div>
    </div>
  </nav>
</header>

  )
}

export default Navbar;