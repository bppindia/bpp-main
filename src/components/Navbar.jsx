// import React, { useState } from "react";
// import bppmic from "../assets/bppmic.png";
// import bpplogo from "../assets/bpplogoo.png";
// import { Bars3Icon } from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [toggleMenu, setToggleMenu] = useState(false);

//   return (
//     <header className="navbar-header">
//       <style>
//         {`
//           .navbar-header {
//             position: sticky;
//             top: 0;
//             z-index: 50;
//             width: 100%;
//             padding: 0.5rem 0;
//             background-color: white;
//             border-bottom: 1px solid #e0e0e0;
//           }
          
//           .navbar-container {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             width: 91.6667%;
//             margin: 0 auto;
//           }
          
//           .navbar-logo-section {
//             display: flex;
//             align-items: center;
//             gap: 1rem;
//             padding-left: 1rem;
//           }
          
//           .navbar-logo {
//             width: 2.5rem;
//           }
          
//           .navbar-logo-lg {
//             width: 7rem;
//           }
          
//           .navbar-title {
//             font-family: 'Montserrat', sans-serif;
//             font-weight: 800;
//             color: #79a5f2;
//           }
          
//           .navbar-subtitle {
//             padding: 0 0.5rem;
//             background-color: #cf502d;
//             color: white;
//             text-align: center;
//             font-size: 0.875rem;
//           }
          
//           .desktop-menu {
//             display: none;
//             font-weight: 600;
//           }
          
//           .desktop-menu a:hover {
//             color: #4b5563; /* gray-600 */
//           }
          
//           .mobile-menu-btn {
//             display: flex;
//           }
          
//           .mobile-menu {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: #f3f4f6; /* gray-100 */
//             z-index: 40;
//             display: ${toggleMenu ? 'flex' : 'none'};
//             flex-direction: column;
//             align-items: center;
//             gap: 2rem;
//             padding-top: 4rem;
//             font-weight: 700;
//             text-transform: uppercase;
//             transition: all 0.5s ease;
//           }
          
//           .mobile-menu a:hover {
//             color: #4b5563; /* gray-600 */
//           }

//           /* Media Query for Large Screens */
//           @media (min-width: 1024px) {
//             .navbar-logo {
//               display: none;
//             }
          
//             .navbar-logo-lg {
//               display: block;
//             }
          
//             .desktop-menu {
//               display: flex;
//               gap: 2rem;
//             }
          
//             .mobile-menu-btn {
//               display: none;
//             }
          
//             .navbar-subtitle {
//               font-size: 1rem;
//             }
//           }

//           // /* Media Query for Small Screens */
//           // @media (max-width: 1023px) {
//           //   .mobile-menu {
//           //     display: ${toggleMenu ? 'none' : 'none'};
//           //   }
//           //   .navbar-logo-lg {
//           //     width: 3rem;
//           //   }
//           //   .navbar-subtitle {
//           //     font-size: 0.45rem;
//           //   }
//           // }
//           @media (max-width: 1023px) {
//            .navbar {
//                 display: flex;
//                 align-items: center;
//                 justify-content: flex-start; /* Align items to the left */
//                 padding: 1rem;
//                  }

//                .navbar-left {
//                display: flex;
//                align-items: center;
//                }

//               .navbar-logo-lg {
//                width: 3rem;
//                margin-right: 0.5rem;
//                }

//               .navbar-text {
//                display: flex;
//               flex-direction: column;
//               }

//               .navbar-title {
//               font-size: 1rem; /* Adjust size as needed */
//               margin: 0;
//               }

//              .navbar-subtitle {
//               font-size: 0.45rem;
//               margin: 0;
//              }

//             .mobile-menu {
//             display: ${toggleMenu ? 'none' : 'block'}; /* Adjust this based on your toggle state */
//            }
//          }

//         `}
//       </style>
      
//       <nav>
//         <div className="navbar-container">
//           {/* Logo Section */}
//           <div className="navbar-logo-section">
//             <Link to="/" className="flex gap-2 items-center">
//               <img src={bpplogo} alt="BPP Logo" className="navbar-logo navbar-logo-lg" />
//               <div className="flex flex-col justify-center">
//                 <span className="navbar-title text-sm lg:text-2xl">
//                   BHARATIYA POPULAR PARTY
//                 </span>
//                 <span className="navbar-subtitle">
//                   Decentralized Democracy, Centralized Progress
//                 </span>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="desktop-menu">
//             <Link to="/" className="hover:text-gray-600">Enroll</Link>
//             <Link to="/" className="hover:text-gray-600">Vision</Link>
//             <Link to="/map" className="hover:text-gray-600">Our Mission</Link>
//             <Link to="/map" className="hover:text-gray-600">Mapping</Link>
//             <Link to="/why-bpp" className="hover:text-gray-600">Why BPP</Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="mobile-menu-btn">
//             <button onClick={() => setToggleMenu(!toggleMenu)} aria-label="Toggle menu">
//               <Bars3Icon className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {toggleMenu && (
//           <div className="mobile-menu">
//             <Link to="/" onClick={() => setToggleMenu(false)}>Enroll</Link>
//             <Link to="/" onClick={() => setToggleMenu(false)}>Vision</Link>
//             <Link to="/map" onClick={() => setToggleMenu(false)}>Our Mission</Link>
//             <Link to="/map" onClick={() => setToggleMenu(false)}>Mapping</Link>
//             <Link to="/why-bpp" onClick={() => setToggleMenu(false)}>Why BPP</Link>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
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
          /* General Navbar Styles */
          .navbar-header {
            position: sticky;
            top: 0;
            z-index: 50;
            width: 100%;
            padding: 0.5rem 0;
            background-color: white;
            border-bottom: 1px solid #e0e0e0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .navbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 91.6667%;
            margin: 0 auto;
          }

          /* Logo and Title Styling */
          .navbar-logo-section {
            display: flex;
            align-items: center;
            gap: 1rem;
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
            font-size: 1rem;
          }

          .navbar-subtitle {
            padding: 0.25rem 0.5rem;
            background-color: #cf502d;
            color: white;
            font-size: 0.75rem;
            text-align: center;
            border-radius: 0.25rem;
          }

          /* Desktop Menu */
          .desktop-menu {
            display: none;
            gap: 1.5rem;
          }
          
          .desktop-menu a {
            color: #333;
            transition: color 0.3s;
          }

          .desktop-menu a:hover {
            color: #4b5563;
          }

          /* Mobile Menu Button */
          .mobile-menu-btn {
            display: flex;
            cursor: pointer;
          }

          /* Mobile Menu */
          .mobile-menu {
            display: ${toggleMenu ? 'flex' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f3f4f6;
            z-index: 40;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            padding-top: 4rem;
            font-weight: 700;
            text-transform: uppercase;
          }
          
          .mobile-menu a {
            color: #333;
            font-size: 1.25rem;
            transition: color 0.3s;
          }

          .mobile-menu a:hover {
            color: #4b5563;
          }

          /* Responsive Styles */
          @media (min-width: 1024px) {
            .navbar-logo {
              display: none;
            }

            .navbar-logo-lg {
              display: block;
            }
          
            .desktop-menu {
              display: flex;
            }
          
            .mobile-menu-btn {
              display: none;
            }

            /* Increase font size on desktop */
            .navbar-title {
              font-size: 1.5rem;
            }
            
            .navbar-subtitle {
              font-size: 1rem;
            }
          }

          /* Mobile adjustments */
          @media (max-width: 1023px) {
            .navbar-title {
              font-size: 1rem;
            }

            .navbar-subtitle {
              font-size: 0.65rem;
            }

            .navbar-logo-lg {
              width: 3rem;
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
                <span className="navbar-title lg:text-2xl">
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

