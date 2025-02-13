'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
    title: "Spring Fashion Collection",
    subtitle: "Up to 40% off on new arrivals",
    cta: "Shop Fashion",
    position: "left"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=1920&q=80",
    title: "Premium Electronics",
    subtitle: "Latest gadgets at unbeatable prices",
    cta: "Explore Gadgets",
    position: "right"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
    title: "Home & Living",
    subtitle: "Transform your space with our collection",
    cta: "Discover More",
    position: "center"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] mt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slides[currentIndex].image})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`absolute inset-0 flex items-center ${
              slides[currentIndex].position === 'left' 
                ? 'justify-start pl-8 md:pl-20' 
                : slides[currentIndex].position === 'right'
                ? 'justify-end pr-8 md:pr-20'
                : 'justify-center'
            }`}
          >
            <div className="text-white text-center px-4 max-w-lg">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {slides[currentIndex].title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                {slides[currentIndex].subtitle}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {slides[currentIndex].cta}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-100' 
                : 'bg-white/50 scale-75 hover:scale-90'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
