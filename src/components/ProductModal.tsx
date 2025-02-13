import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { XMarkIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ProductProps } from './ProductCard';
import { useStore } from '@/store/useStore';

export default function ProductModal({
  isOpen,
  closeModal,
  id,
  name,
  price,
  discountedPrice,
  image,
  description
}: ProductProps & { isOpen: boolean; closeModal: () => void }) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.some(item => item.id === id);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="space-y-4">
                    <Dialog.Title className="text-2xl font-bold">{name}</Dialog.Title>
                    <div className="space-y-2">
                      <p className="text-gray-600">{description}</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-primary">₹{discountedPrice}</span>
                        {price > discountedPrice && (
                          <span className="text-gray-500 line-through">₹{price}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => addToCart({ id, name, price: discountedPrice, image, quantity: 1 })}
                        className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCartIcon className="h-5 w-5" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => isInWishlist ? removeFromWishlist(id) : addToWishlist({ id, name, price, discountedPrice, image })}
                        className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        {isInWishlist ? (
                          <HeartSolidIcon className="h-6 w-6 text-red-500" />
                        ) : (
                          <HeartIcon className="h-6 w-6 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
