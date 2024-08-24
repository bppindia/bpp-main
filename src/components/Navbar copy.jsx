'use client'
import React, { useState } from 'react'
import bpplogo from '../assets/bpplogo.png';
import bpplogoname from '../assets/bpplogoname.png';
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Enroll', href: '#' },
  { name: 'Vision', href: '#' },
  { name: 'Mission', href: '#' },
]

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
  //   <header className="sticky top-0 z-50 w-full border-b bg-white">
  //   <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
  //     <div className="inline-flex items-center space-x-2">
  //     <img src={bpplogoname} width={500}/>
  //     </div>
  //     <div className="hidden lg:block">
  //       <ul className="inline-flex space-x-8">
  //         {menuItems.map((item) => (
  //           <li key={item.name}>
  //             <a
  //               href={item.href}
  //               className="text-xl font-semibold text-gray-800 hover:text-gray-900"
  //             >
  //               {item.name}
  //             </a>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div className="hidden lg:block">
  //     </div>
  //     <div className="lg:hidden">
  //       <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
  //     </div>
  //     {isMenuOpen && (
  //       <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
  //         <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
  //           <div className="px-5 pb-6 pt-5">
  //             <div className="flex items-center justify-between">
  //               <div className="inline-flex items-center space-x-2">
                  

  //               <img src={bpplogoname} width={500}/> 
  //               </div>
  //               <div className="-mr-2">
  //                 <button
  //                   type="button"
  //                   onClick={toggleMenu}
  //                   className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
  //                 >
  //                   <span className="sr-only">Close menu</span>
  //                   <X className="h-6 w-6" aria-hidden="true" />
  //                 </button>
  //               </div>
  //             </div>
  //             <div className="mt-6">
  //               <nav className="grid gap-y-4">
  //                 {menuItems.map((item) => (
  //                   <a
  //                     key={item.name}
  //                     href={item.href}
  //                     className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
  //                   >
  //                     <span className="ml-3 text-base font-medium text-gray-900">
  //                       {item.name}
  //                     </span>
  //                   </a>
  //                 ))}
  //               </nav>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // </header>



  <header className="absolute inset-x-0 top-0 z-50">
  <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
    <div className="flex lg:flex-col lg:flex-1 gap-2 items-center">
      <a href="#" className="-m-1.5 p-1.5">
        <img
          alt=""
          src={bpplogo}
          className="h-20 w-auto lg:h-28"
        />
      </a>
      <h2 className='text-xl font-bold tracking-tight text-center text-white sm:text-4xl' 
      // style={{color: "#CF502D"}}
      >BHARATIYA POPULAR PARTY</h2>
     <div className="flex items-center justify-center">
  <hr className="w-1/3 border-t border-white mx-2" />
  <div className="text-white text-center px-4">Decentralized Democracy Centralized Progress</div>
  <hr className="w-1/3 border-t border-white mx-2" />
</div>

    </div>
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>
    </div>
  </nav>
  <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
    <div className="fixed inset-0 z-50" />
    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
      <a href="#" className="-m-1.5 p-1.5">
        <img
          alt=""
          src={bpplogo}
          className="h-20 w-auto lg:h-28"
        />
      </a>
      <h2 className='text-xl font-bold tracking-tight text-center sm:text-4xl' style={{color: "#CF502D"}}>BHARATIYA POPULAR PARTY</h2>
     
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="-m-2.5 rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</header>
  )
}

export default Navbar;