import { useEffect, useState } from "react";
import { Slide1 } from "@/components/slider/slide1";
import { Slide2 } from "@/components/slider/slide2";
import { Slide3 } from "@/components/slider/slide3";
import { Slide4 } from "./slide4";
import { Slide5 } from "./slide5";
import { Slide6 } from "./slide6";
import { Slide7 } from "./slide7";
import { Slide8 } from "./slide8";
import { Slide9 } from "./slide9";
import { Slide10 } from "./slide10";
import { Slide11 } from "./slide11";
import { Slide12 } from "./slide12";
import { Slide13 } from "./slide13";
import { Slide14 } from "./slide14";

const SLIDE_DURATION = 13000; // 5 seconds per slide

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${100}%`,
        }}
      >
        {slides.map((Slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <Slide />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}