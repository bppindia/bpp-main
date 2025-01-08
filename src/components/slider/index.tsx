import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Slide1 } from "./slide1";
import { Slide10 } from "./slide10";
import { Slide11 } from "./slide11";
import { Slide12 } from "./slide12";
import { Slide13 } from "./slide13";
import { Slide2 } from "./slide2";
import { Slide4 } from "./slide4";
import { Slide5 } from "./slide5";
import { Slide6 } from "./slide6";
import { Slide7 } from "./slide7";
import { Slide8 } from "./slide8";
import { Slide9 } from "./slide9";

const SLIDE_DURATION = 5000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = [Slide1, Slide2, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13];

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

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, SLIDE_DURATION);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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

      {/* Navigation Arrows */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors duration-300 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors duration-300 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

  {/* Navigation Dots */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="absolute bottom-7  left-1/2 transform -translate-x-1/2 gap-3 z-10 hidden md:flex"
>
  {slides.map((_, index) => (
    <motion.button
      key={index}
      whileHover={{ scale: 1.2 }}
      onClick={() => goToSlide(index)}
      className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentSlide === index
        ? "bg-white scale-150"
        : "bg-white/50 hover:bg-white/75"
        }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</motion.div>



      {/* Pause Indicator */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm z-10"
          >
            Paused
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}