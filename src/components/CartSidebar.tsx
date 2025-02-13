'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, getCartTotal } = useStore();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-300'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-300'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col bg-white shadow-xl rounded-l-2xl'>
                    <div className='flex-1 overflow-y-auto px-6 py-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-xl font-semibold text-gray-900'>
                          Shopping Cart
                        </Dialog.Title>
                        <button
                          type='button'
                          className='relative -m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors'
                          onClick={onClose}
                        >
                          <XMarkIcon className='h-6 w-6' />
                        </button>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul role='list' className='divide-y divide-gray-200'>
                            {cart.map((product) => (
                              <li key={product.id} className='flex py-6'>
                                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 relative'>
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className='object-cover object-center'
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3 className='line-clamp-1'>
                                        {product.name}
                                      </h3>
                                      <p className='ml-4 text-primary-600 font-semibold'>
                                        ${product.discountedPrice.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <button
                                      type='button'
                                      onClick={() => removeFromCart(product.id)}
                                      className='font-medium text-secondary-600 hover:text-secondary-500 transition-colors'
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-6 py-6'>
                      <div className='flex justify-between text-lg font-semibold text-gray-900'>
                        <p>Subtotal</p>
                        <p>${getCartTotal().toFixed(2)}</p>
                      </div>
                      <p className='mt-1 text-sm text-gray-500'>
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className='mt-6'>
                        <button className='w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-medium shadow-md'>
                          Checkout
                        </button>
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
