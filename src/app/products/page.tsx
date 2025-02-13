'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { products, Product } from '@/data/products';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, addToWishlist } = useStore();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  return (
    <div className='min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
      {/* Header Section */}
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Our Products</h1>

        {/* Search and Filter Section */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
          <div className='relative flex-1'>
            <MagnifyingGlassIcon className='h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search products...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='relative'>
            <FunnelIcon className='h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <select
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300'
            >
              <div className='aspect-w-1 aspect-h-1'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-full h-64 object-cover'
                />
              </div>
              <div className='p-4'>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  {product.title}
                </h3>
                <p className='text-sm text-gray-600 mb-2'>
                  {product.description}
                </p>
                <p className='text-xl font-bold text-primary-600 mb-4'>
                  ${product.price.toFixed(2)}
                </p>
                <div className='flex gap-2'>
                  <button
                    onClick={() => addToCart(product)}
                    className='flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors'
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className='p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg transition-colors'
                  >
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
