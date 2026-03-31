import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { clearTokens, getAccessToken } from '../utils/Auth';

const Navbar = () => {

    const { cartItems } = useCart();
    const navigate = useNavigate();
    const  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate("/login");
    }

  return (
    <nav className='bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50'>
        <Link to="/" className='text-2xl font-bold text-gray-800'>🚛 DjangoCart</Link>

        <div className='flex items-center gap-6'>
            {
                !isLoggedIn ? (
                    <>
                        <Link to='/login' className='text-gray-800 hover:text-gray-600 font-medium'>Login</Link>
                        <Link to='/signup' className='text-gray-800 hover:text-gray-600 font-medium'>Sign Up</Link>
                    </>
                ) :
                (
                    <button onClick={handleLogout} className='text-gray-800 hover:text-gray-600 font-medium'>Logout</button>
                )
            }
        </div>

        <Link to="/cart" className='relative text-gray-800 hover:text-gray-600 font-medium'>🛒 Cart {
            cartCount > 0 && (
                <span className='absolute -top-2 -right-3 bg-red-500 text-xs font-bold px-2 rounded-full text-white'>
                    {cartCount}
                </span>
            )
        }</Link>
    </nav>
  )
}

export default Navbar
