"use client";
import React, { useState } from "react";
import bppmic from "../../assets/bppmic.png";
import bpplogo from "../../assets/bpplogoo.png";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const MapNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-2 w-full border-b " style={{backgroundColor:"#b9cdf0"}}>
      <nav>
        <div className="max-w-full mx-auto">
          <div className="flex justify-between items-center mx-auto w-5/6">
            {/* Logo Section */}
            
            {/* Desktop Menu */}
            <div className="hidden poppins-bold lg:flex gap-8">
              <Link to="/" className="hover:text-gray-600">
                Enroll
              </Link>
              <Link to="/" className="hover:text-gray-600">
                Vision
              </Link>
              <Link to="/map" className="hover:text-gray-600">
                Our Mission
              </Link>
              <Link to="/map" className="hover:text-gray-600">
                Mapping
              </Link>
              <Link to="/why-bpp" className="hover:text-gray-600">
                Why BPP
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="flex gap-6 lg:hidden">
              <button
                onClick={() => setToggleMenu(!toggleMenu)}
                aria-label="Toggle menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top transition-height duration-700 ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8 mt-6">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              <Link to="/" className="hover:text-gray-600">
                Enroll
              </Link>
              <Link to="/" className="hover:text-gray-600">
                Vision
              </Link>
              <Link to="/" className="hover:text-gray-600">
                Our Mission
              </Link>
              <Link to="/why-bpp" className="hover:text-gray-600">
                Why BPP
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MapNavbar;
