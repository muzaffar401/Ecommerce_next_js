"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import Cart from './Cart'
import { CartContext } from '../context/CartContext'

const Navbar = () => {
    const { totalQuantity, showCart, setShowCart }: any = useContext(CartContext);

    const handleCick = () => {
        setShowCart(!showCart)
    }
    return (
        <>
            <div className='w-full h-[80px] bg-white'>
                <div className='container h-full w-full items-center flex justify-between'>
                    <Link href={'/'} className='font-urbanist font-black text-2xl'>Shop</Link>
                    <button className='relative text-[25px]' onClick={handleCick}>
                        <FiShoppingBag />
                        <span className='cart-item-qty'>{totalQuantity}</span>
                    </button>
                </div>
            </div>
            {showCart && <Cart />}
        </>
    )
}

export default Navbar