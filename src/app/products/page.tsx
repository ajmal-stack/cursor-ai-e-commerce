'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { products, Product } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, addToWishlist } = useStore();
  const [products, setProducts] = useState<Product[]>([]);

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
    <main className='min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <div className='relative h-48 w-full'>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
      <Footer />
    </main>
  );
}
