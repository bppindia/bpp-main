import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// import Layout from "@/layout/Layout.jsx";
import "./indianMap.css";
import IndiaMap from "./IndiaMap";
// import IndiaData from "./indiaData";
// import MapCompent from "./MapCompent";
// import MapNavbar from "./MapNavbar";
import { Link } from "react-router-dom";
import bppmic from "../../assets/bppmic.png";

const Map = () => {
  const [animationPhase, setAnimationPhase] = useState("initial");
  const [bgOpacity, setBgOpacity] = useState(0);
  const mapRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 1, x: 0 },
      {
        opacity: 1,
        scale: 1.5,
        duration: 3,
        ease: "power2.out",
        transformOrigin: "center center", // Ensure scaling from the center
        onComplete: () => {
          gsap.to(mapRef.current, {
            scale: 1.23,
            opacity: 0.8,
            // x: "-50px", // Adjust shift to avoid large movement
            y: "-5px", // Keep shift minimal to prevent layout issues
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => setAnimationPhase("completed"),
          });
        },
      }
    );
    // Set initial background opacity to 100%
    gsap.set(bgRef.current, {
      opacity: 1,
    });

    // After a delay, reduce the background opacity to a lower value
    gsap.to(bgRef.current, {
      opacity: 0.5, // New reduced opacity
      duration: 10, // Duration for fade-out effect
      ease: "power2.inOut",
      delay: 1, // Delay to start fading after initial animation
    });
    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 10, // Duration for fade-in effect
      ease: "power2.inOut",
      delay: 6, // Total delay = initial delay + fade-out duration
    });
  }, []);

  return (
    <>
      <div
        className="map-container"
        ref={bgRef}
        style={{
          overflow: "hidden",
          backgroundImage:
            animationPhase === "initial"
              ? "url(/homepagebanner.png)"
              : "url('/BlueBG.png')",
          opacity: bgOpacity, // Bind opacity to bgOpacity state
        }}
      >
        <nav className="z-10">
          <div className="hidden poppins-bold lg:flex gap-8 absolute top-0 right-4 m-5 text-xl ">
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
        </nav>
        <div className="india-map-wrapper" ref={mapRef}>
          <IndiaMap animationPhase={animationPhase} />
        </div>
      </div>
      <div className="Welcome-bpp text-center my-4">
        <span className="Welcome-bpp-content font-bold text-xl  text-gray-500">
          Welcome to BPP. Please select your State below.{" "}
        </span>
        <br />
        <span className="Welcome-bpp-content font-bold   text-gray-500">
          If you do not see your State listed, please click here.
        </span>
        <span className="nfr-tooltip mx-3">
          <svg
            width="19"
            height="19"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0 M 501 191C 626 191 690 275 690 375C 690 475 639 483 595 513C 573 525 558 553 559 575C 559 591 554 602 541 601C 541 601 460 601 460 601C 446 601 436 581 436 570C 436 503 441 488 476 454C 512 421 566 408 567 373C 566 344 549 308 495 306C 463 303 445 314 411 361C 400 373 384 382 372 373C 372 373 318 333 318 333C 309 323 303 307 312 293C 362 218 401 191 501 191C 501 191 501 191 501 191M 500 625C 541 625 575 659 575 700C 576 742 540 776 500 775C 457 775 426 739 425 700C 425 659 459 625 500 625C 500 625 500 625 500 625"
              fill="#797979"
            />
          </svg>
          {/* <span className="nfr-tooltiptext">
            Young Living does not have a warehouse in your country, please use
            the United States Not For Resale (NFR) site here to shop.
          </span> */}
        </span>
      </div>

      <div className="state-region-wise">
        <div className="states-regions flex">
          <div className="northern ">
            <h6 className="font-medium text-lg leading-tight text-gray-500 my-2">
              Northern
            </h6>
            <div className="states-northern ">
              {["Haryana", "Himachal Pradesh", "Punjab", "Rajasthan"].map(
                (state, index) => (
                  <div key={index} className={`state-${state.toLowerCase()} `}>
                    <h4 className="text-base   font-normal">{state}</h4>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="western">
            <h6 className="font-medium text-lg leading-tight text-gray-500 my-2">
              Western
            </h6>
            <div className="states-western">
              {["Maharashtra", "Gujarat", "Goa"].map((state, index) => (
                <div key={index} className={`state-${state.toLowerCase()}`}>
                  <h4 className="text-base font-normal">{state}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="southern ">
            <h6 className="font-medium text-lg leading-tight text-gray-500 my-2 ">
              Southern
            </h6>
            <div className="states-southern">
              {[
                "Andhra Pradesh",
                "Karnataka",
                "Kerala",
                "Tamil Nadu",
                "Telangana",
              ].map((state, index) => (
                <div key={index} className={`state-${state.toLowerCase()} `}>
                  <h4 className="text-base font-normal">{state}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="central">
            <h6 className="font-medium text-lg leading-tight text-gray-500 my-2">
              Central
            </h6>
            <div className="states-central">
              {[
                "Chhattisgarh",
                "Madhya Pradesh",
                "Uttar Pradesh",
                "Uttarakhand",
              ].map((state, index) => (
                <div key={index} className={`state-${state.toLowerCase()}`}>
                  <h4 className="text-base font-normal">{state}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="eastern">
            <h6 className="font-medium text-lg leading-tight text-gray-500 my-2">
              Eastern
            </h6>
            <div className="states-eastern">
              {["Bihar", "Jharkhand", "Odisha", "West Bengal"].map(
                (state, index) => (
                  <div key={index} className={`state-${state.toLowerCase()}`}>
                    <h4 className="text-base font-normal">{state}</h4>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="north-eastern ">
            <h6 className="font-medium text-lg leading-tight text-gray-500 my-2">
              North-Eastern
            </h6>
            <div className="states-north-eastern">
              {[
                "Arunachal Pradesh",
                "Assam",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Sikkim",
                "Tripura",
              ].map((state, index) => (
                <div key={index} className={`state-${state.toLowerCase()} `}>
                  <h4 className="text-base font-normal">{state}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-6  max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
        <div>
          <a
            href="/"
            className="flex gap-3 font-bold text-black-700 items-center"
          >
            <img src={bppmic} width={25} height={25} />
            <span className="poppins-regular font-black text-md lg:text-xl">
              BHARATIYA POPULAR PARTY
            </span>
          </a>
        </div>
        <div className="md:mt-0">
          <p className="text-sm font-medium text-gray-500">
            © 2024 Bharatiya Popular Party. All rights reserved.
          </p>
        </div>
      </div>

      {/* <IndiaData/> */}
    </>
  );
};

export default Map;
