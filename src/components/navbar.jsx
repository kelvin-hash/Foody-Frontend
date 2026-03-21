import React from "react";
import logo from "../assets/logo.png";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

function Navbar() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  return (
    <>
    <header className="sticky top-0 py-4 bg-white/70 backdrop-blur-md shadow-md z-50">
      {/* wrapper div */}
      <div className="flex px-6 max-w-7xl mx-auto justify-between items-center">
        {/* left side logo + name */}
        <div className="flex gap-2">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </div>
          <p className=" text-red-500 font-bold text-2xl">FOODY</p>
        </div>
        <div>
          <nav className="hidden md:flex gap-6">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-orange-500 transition-colors">
              Home
            </button>
            <button onClick={() => navigate('/restaurant')} className="text-gray-700 hover:text-orange-500 transition-colors">
              Restaurants
            </button>
            <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-orange-500 transition-colors">
              About Us
            </button>
          </nav>
        </div>
        {/* right side menu */}
        <div className="flex gap-4 items-center">
          {/* Cart Button */}
          <button
            onClick={() => navigate('/checkout')}
            className="relative p-2 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Conditional Auth Buttons */}
          {isAuthenticated ? (
            <>
              {/* User greeting */}
              <span className="text-gray-700 font-medium">
                Hi, {user?.name}
              </span>

              {/* Logout button */}
              <button
                onClick={logout}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign In button */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-2 text-gray-700 font-medium hover:text-orange-500"
              >
                Sign in
              </button>

              {/* Sign Up button */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
      <hr className="mt-6 border-t border-gray-500" />
    </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
export default Navbar;