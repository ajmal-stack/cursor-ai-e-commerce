'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FiltersProps {
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
}

export default function Filters({
  categories,
  selectedCategories,
  priceRange,
  maxPrice,
  onCategoryChange,
  onPriceChange,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between p-2 bg-gray-100 rounded-md mb-4"
      >
        <span className="font-medium">Filters</span>
        <ChevronDownIcon
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) =>
                    onPriceChange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => onCategoryChange(category)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
