import React, { useState } from "react";
import bppmic from "../assets/bppmic.png";
import bpplogo from "../assets/bpplogoo.png";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="navbar-header">
      <style>
        {`
          .navbar-header {
            position: sticky;
            top: 0;
            z-index: 50;
            width: 100%;
            padding: 0.5rem 0;
            background-color: white;
            border-bottom: 1px solid #e0e0e0;
          }
          
          .navbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 91.6667%;
            margin: 0 auto;
          }
          
          .navbar-logo-section {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding-left: 1rem;
          }
          
          .navbar-logo {
            width: 2.5rem;
          }
          
          .navbar-logo-lg {
            width: 7rem;
          }
          
          .navbar-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            color: #79a5f2;
          }
          
          .navbar-subtitle {
            padding: 0 0.5rem;
            background-color: #cf502d;
            color: white;
            text-align: center;
            font-size: 0.875rem;
          }
          
          .desktop-menu {
            display: none;
            font-weight: 600;
          }
          
          .desktop-menu a:hover {
            color: #4b5563; /* gray-600 */
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f3f4f6; /* gray-100 */
            z-index: 40;
            display: ${toggleMenu ? 'flex' : 'none'};
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            padding-top: 4rem;
            font-weight: 700;
            text-transform: uppercase;
            transition: all 0.5s ease;
          }
          
          .mobile-menu a:hover {
            color: #4b5563; /* gray-600 */
          }

          /* Media Query for Large Screens */
          @media (min-width: 1024px) {
            .navbar-logo {
              display: none;
            }
          
            .navbar-logo-lg {
              display: block;
            }
          
            .desktop-menu {
              display: flex;
              gap: 2rem;
            }
          
            .mobile-menu-btn {
              display: none;
            }
          
            .navbar-subtitle {
              font-size: 1rem;
            }
          }

          /* Media Query for Small Screens */
          @media (max-width: 1023px) {
            .mobile-menu {
              display: ${toggleMenu ? 'flex' : 'none'};
            }
            .navbar-logo-lg {
              width: 3rem;
            }
            .navbar-subtitle {
              font-size: 0.35rem;
            }
          }
        `}
      </style>
      
      <nav>
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-logo-section">
            <Link to="/" className="flex gap-2 items-center">
              <img src={bpplogo} alt="BPP Logo" className="navbar-logo navbar-logo-lg" />
              <div className="flex flex-col justify-center">
                <span className="navbar-title text-sm lg:text-2xl">
                  BHARATIYA POPULAR PARTY
                </span>
                <span className="navbar-subtitle">
                  Decentralized Democracy, Centralized Progress
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <Link to="/" className="hover:text-gray-600">Enroll</Link>
            <Link to="/" className="hover:text-gray-600">Vision</Link>
            <Link to="/map" className="hover:text-gray-600">Our Mission</Link>
            <Link to="/map" className="hover:text-gray-600">Mapping</Link>
            <Link to="/why-bpp" className="hover:text-gray-600">Why BPP</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn">
            <button onClick={() => setToggleMenu(!toggleMenu)} aria-label="Toggle menu">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {toggleMenu && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setToggleMenu(false)}>Enroll</Link>
            <Link to="/" onClick={() => setToggleMenu(false)}>Vision</Link>
            <Link to="/map" onClick={() => setToggleMenu(false)}>Our Mission</Link>
            <Link to="/map" onClick={() => setToggleMenu(false)}>Mapping</Link>
            <Link to="/why-bpp" onClick={() => setToggleMenu(false)}>Why BPP</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
