'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Filters from './Filters';
import productsData from '@/data/products.json';

export default function TopDeals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Get unique categories and max price
  const categories = useMemo(() => {
    return Array.from(new Set(productsData.products.map(product => product.category)));
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...productsData.products.map(product => product.price));
  }, []);

  // Filter products based on search, categories, and price
  const filteredProducts = useMemo(() => {
    return productsData.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategories, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Top Deals
        </h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <Filters
            categories={categories}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onCategoryChange={handleCategoryChange}
            onPriceChange={setPriceRange}
          />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
