'use client';

import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import CartSidebar from './CartSidebar';
import WishlistSidebar from './WishlistSidebar';

export default function Navbar() {
  const { wishlist, getCartCount, getCartTotal } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <>
      <nav className='fixed top-0 w-full bg-white shadow-lg z-50 backdrop-blur-sm bg-white/80'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link
              href='/'
              className='font-bold text-2xl text-primary-600 hover:text-primary-700 transition-colors'
            >
              EStore
            </Link>

            {/* Navigation Links - Hidden on mobile */}
            <div className='hidden md:flex space-x-8'>
              <Link
                href='/'
                className='text-gray-600 hover:text-primary-600 transition-colors font-medium'
              >
                Home
              </Link>
              <Link
                href='/products'
                className='text-gray-600 hover:text-primary-600 transition-colors font-medium'
              >
                Products
              </Link>
              <Link
                href='/categories'
                className='text-gray-600 hover:text-primary-600 transition-colors font-medium'
              >
                Categories
              </Link>
            </div>

            {/* Cart and Wishlist */}
            <div className='flex items-center space-x-6'>
              <button
                className='relative p-2 text-gray-600 hover:text-primary-600 transition-colors'
                onClick={() => setIsWishlistOpen(true)}
              >
                <HeartIcon className='h-6 w-6' />
                <span className='absolute -top-1 -right-1 bg-secondary-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center shadow-md'>
                  {wishlist.length}
                </span>
              </button>
              <button
                className='relative p-2 text-gray-600 hover:text-primary-600 transition-colors group'
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartIcon className='h-6 w-6' />
                <span className='absolute -top-1 -right-1 bg-secondary-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center shadow-md'>
                  {getCartCount()}
                </span>

                {/* Cart total tooltip */}
                <div className='absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl py-2 px-4 text-sm opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-0 translate-y-2 pointer-events-none'>
                  Total: ${getCartTotal().toFixed(2)}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
}
