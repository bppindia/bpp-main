  import React, { useEffect, useRef, useState } from "react";
  import { gsap } from "gsap";
  import Layout from "@/layout/Layout.jsx";
  import "./indianMap.css";
  import IndiaMap from "./IndiaMap";
import IndiaData from "./indiaData";

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
              scale: 1,
              opacity: 0.8,
              // x: "-50px", // Adjust shift to avoid large movement
              y: "-65px", // Keep shift minimal to prevent layout issues
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
      duration: 10,  // Duration for fade-out effect
      ease: "power2.inOut",
      delay: 1, // Delay to start fading after initial animation
    });
    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 10, // Duration for fade-in effect
      ease: "power2.inOut",
      delay: 6,    // Total delay = initial delay + fade-out duration
    });
    }, []);

    

    return (
      <Layout>
        <div
          className="map-container"
          ref={bgRef}
          style={{
            overflow: "hidden",
            backgroundImage:
              animationPhase === "initial"
                ? "url(/homepagebanner.png)"
                :  "url('/BlueBG.png')",
                opacity: bgOpacity, // Bind opacity to bgOpacity state
             
          }}
        >
          <div className="india-map-wrapper" ref={mapRef}>
            <IndiaMap animationPhase={animationPhase} />
          </div>
        </div>
        {/* <IndiaData/> */}
      </Layout>
    );
  };

  export default Map;
