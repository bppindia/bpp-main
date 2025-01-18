import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Slide1 } from "./slide1";
import { Slide10 } from "./slide10";
import { Slide11 } from "./slide11";
import { Slide12 } from "./slide12";
import { Slide2 } from "./slide2";
import { Slide3 } from "./slide3";
import { Slide4 } from "./slide4";
import { Slide5 } from "./slide5";
import { Slide6 } from "./slide6";
import { Slide7 } from "./slide7";
import { Slide8 } from "./slide8";
import { Slide9 } from "./slide9";

const SLIDE_DURATION = 5000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0
  })
};

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const previousSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    // Threshold for swipe (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
      setIsTouching(false);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  useEffect(() => {
    if (!isPaused && !isTouching) {
      const timer = setInterval(nextSlide, SLIDE_DURATION);
      return () => clearInterval(timer);
    }
  }, [isPaused, isTouching, nextSlide]);

  return (
    <div
      className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {slides[currentSlide] && React.createElement(slides[currentSlide])}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:block">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={previousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-colors duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-colors duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </motion.button>
      </div>

      {/* Navigation Dots - Responsive sizing and spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10"
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${currentSlide === index
                ? "bg-white scale-150"
                : "bg-white/50 hover:bg-white/75"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* Pause Indicator - Responsive positioning */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/30 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm z-10"
          >
            Paused
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}