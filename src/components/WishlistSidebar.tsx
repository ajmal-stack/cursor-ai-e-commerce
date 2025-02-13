'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  image: string;
  description?: string;
}

export default function WishlistSidebar({
  isOpen,
  onClose,
}: WishlistSidebarProps) {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const moveToCart = (item: Product) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Wishlist
                        </Dialog.Title>
                        <button
                          type='button'
                          className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                          onClick={onClose}
                        >
                          <XMarkIcon className='h-6 w-6' />
                        </button>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {wishlist.map((item) => (
                              <li key={item.id} className='flex py-6'>
                                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative'>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className='object-cover object-center'
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>{item.name}</h3>
                                      <p className='ml-4'>
                                        ${item.discountedPrice.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <div className='flex space-x-4'>
                                      <button
                                        type='button'
                                        onClick={() =>
                                          removeFromWishlist(item.id)
                                        }
                                        className='font-medium text-red-600 hover:text-red-500'
                                      >
                                        Remove
                                      </button>
                                      <button
                                        type='button'
                                        onClick={() => moveToCart(item)}
                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                      >
                                        Move to Cart
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
