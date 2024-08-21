import React from 'react'
import bpplogo from '../assets/bpplogo.svg'

const Footer = () => {
  return (
    <section className="relative overflow-hidden border-t py-10">
    <div className="relative z-10 mx-auto max-w-5xl px-4">
      <div className="-m-6 flex flex-wrap">
        <div className="w-full p-6">
          <div className="flex h-full flex-col justify-between">
            <div className="mb-4 inline-flex gap-2 items-center">
            <img src={bpplogo} alt="BPP Logo" width={30} height={30} />
            <span className="font-bold text-3xl">Bharatiya Popular Party</span>
            </div>
            <div>
              <p className="mb-4  text-base font-medium">Please be advised that Bharatiya Popular Party does not hold any official accounts on social media platforms. </p>
              <p className="mb-4  text-base font-medium">Our organization is not present on any social media network, including but not limited to Facebook, Twitter, Instagram, LinkedIn, and others. Reporting Unauthorized Accounts</p>
              <p className="mb-4  text-base font-medium">If you encounter any social media accounts or profiles that claim to represent Bhartiya Popular Party or use our name, logo, or any other intellectual property, please notify us immediately. These accounts are unauthorized and not affiliated with our organization.
              To report any such accounts, please contact us through email.</p>
              <p className="text-sm text-gray-600">
                &copy; Copyright 2024. All Rights Reserved by Bharatiya popular party.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Footer