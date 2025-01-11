"use client"

import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import React, { useContext, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';  // Import the tick mark icon
import { CartContext } from '../context/CartContext';

const ProductDetails = ({product}:any) => {
    const [index, setIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility
    const { cartItems, addProduct, qty, decQty, incQty }: any = useContext(CartContext);

    const handleAddToCart = () => {
        addProduct(product, qty);  // Add the product to the cart
        setShowPopup(true);  // Show the success popup
        setTimeout(() => setShowPopup(false), 5000);  // Hide the popup after 2 seconds
    }

    return (
        <div className='product-details-section'>
            <div className='product-details-container'>

                {/* Left */}
                <div>
                    {/* TOP */}
                    <div className='h-[350px] md:h-[450px] flex items-center mb-4 w-full'>
                        <Image
                            loader={() => urlFor(product.images[index]).url()}
                            src={urlFor(product.images[index]).url()}
                            alt={`Product Image ${index}`}
                            width={350}
                            height={350}
                            className='object-cover mx-auto rounded-lg transition-transform duration-300 hover:scale-105'
                        />
                    </div>

                    {/* BOTTOM */}
                    <div className='small-images-container mt-10 flex gap-2 justify-center overflow-x-auto'>
                        {product.images?.map((item: any, i: number) => (
                            <div
                                key={i}
                                className={`flex-shrink-0 ${i === index ? 'border-2 border-black' : 'border-2 border-gray-300'}`}
                            >
                                <Image
                                    loader={() => urlFor(product.images[i]).url()}
                                    src={urlFor(product.images[i]).url()}
                                    alt={`Thumbnail ${i}`}
                                    width={100}
                                    height={100}
                                    className='object-cover rounded-lg w-20 h-20 cursor-pointer transition-all duration-300 hover:border-black'
                                    onClick={() => setIndex(i)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className='flex flex-col gap-8 md:pt-32 pt-0'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-3xl font-bold'>{product.name}</div>
                        <div className='text-xl font-medium'>{product.description}</div>
                        <div className='text-xl font-medium'>${product.price}</div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <h3>Quantity</h3>
                        <p className='quantity-desc flex items-center border-black'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>

                    <button className='btn add-to-cart' onClick={handleAddToCart}>
                        Add To Cart
                    </button>
                </div>

            </div>

            {/* Popup - Item Added Successfully */}
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 opacity-100">
                    <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-xs w-full transform scale-110 transition-all duration-500">
                        <FiCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
                        <h3 className="text-lg font-bold">Item Added to Cart!</h3>
                        <p className="mt-2">Your item has been successfully added to the cart.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails;
