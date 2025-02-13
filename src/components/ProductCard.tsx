'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import ProductModal from './ProductModal';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  image: string;
  description: string;
}

export default function ProductCard({
  id,
  name,
  price,
  discountedPrice,
  image,
  description,
}: ProductProps) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.some((item) => item.id === id);

  const discount = Math.round(((price - discountedPrice) / price) * 100);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, discountedPrice, image });
    }
  };

  return (
    <div>
      <motion.div
        whileHover={{ y: -5 }}
        className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'
        onClick={() => setIsModalOpen(true)}
        role='button'
        tabIndex={0}
      >
        <div className='relative h-48 w-full group'>
          <Image
            src={image}
            alt={name}
            fill
            className='object-cover transform group-hover:scale-105 transition-transform duration-300'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            loading='lazy'
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className='absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-50 transition-colors'
          >
            {isInWishlist ? (
              <HeartSolidIcon className='h-5 w-5 text-secondary-500' />
            ) : (
              <HeartIcon className='h-5 w-5 text-gray-600' />
            )}
          </motion.button>
          <div className='absolute top-2 left-2'>
            <span className='bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg'>
              {discount}% OFF
            </span>
          </div>
        </div>

        <div className='p-4'>
          <h3 className='text-lg font-semibold text-gray-800 mb-1 line-clamp-1'>
            {name}
          </h3>
          <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
            {description}
          </p>

          <div className='flex items-center gap-2 mb-4'>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              className='text-xl font-bold text-primary-600'
            >
              ${discountedPrice.toFixed(2)}
            </motion.span>
            <span className='text-sm text-gray-400 line-through'>
              ${price.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ id, name, price, discountedPrice, image });
            }}
            className='w-full bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-medium shadow-md'
          >
            <ShoppingCartIcon className='h-5 w-5' />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>

      <ProductModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        id={id}
        name={name}
        price={price}
        discountedPrice={discountedPrice}
        image={image}
        description={description}
      />
    </div>
  );
}
