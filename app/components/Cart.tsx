'use client';

import React, { useContext, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { CartContext } from '../context/CartContext';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export default function ShoppingCart() {
  const { onRemove, toggleCartItemQty, totalPrice, totalQuantity, cartItems, showCart, setShowCart }: any = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartItems }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error during checkout', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={showCart} onClose={setShowCart} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition-all">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Your Cart</DialogTitle>
                    <button
                      type="button"
                      onClick={() => setShowCart(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {cartItems.length > 0 ? (
                    <div className="mt-8">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product: any) => (
                          <li key={product._id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                loader={() => urlFor(product.images[0]).url()}
                                src={urlFor(product.images[0]).url()}
                                alt={product.name}
                                width={96}
                                height={96}
                                className="object-cover"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{product.name}</h3>
                                  <p className="ml-4">${product.price}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    onClick={() => toggleCartItemQty(product._id, 'minus')}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <AiOutlineMinus />
                                  </button>
                                  <span className="mx-2">{product.quantity}</span>
                                  <button
                                    onClick={() => toggleCartItemQty(product._id, 'plus')}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <AiOutlinePlus />
                                  </button>
                                </div>
                                <button
                                  onClick={() => onRemove(product)}
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  <TiDeleteOutline className="inline-block h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-8 text-center text-gray-500">Your cart is empty.</p>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${totalPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button
                        onClick={handleCheckout}
                        className={`flex w-full items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white shadow-sm ${
                          isProcessing
                            ? 'bg-gray-400 cursor-wait'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Checkout'}
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <button
                        onClick={() => setShowCart(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
