import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartItem } from '../../types';

interface HeaderProps {
  setCartOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  setCartOpen,
  cartItems,
  currentCategory,
  setCurrentCategory
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const activeCategory = pathname === '/' ? 'all' : pathname.split('/')[2] || currentCategory;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="wrap-navbar">
      {/* Left section: Navigation Categories */}
      <div className="flex items-center space-x-8">
        {['all', 'tech', 'clothes'].map((category) => (
          <Link
            key={category}
            to={`/${category === 'all' ? '' : `category/${category}`}`}
            data-testid={category === activeCategory ? 'active-category-link' : 'category-link'}
            className={`uppercase ${
              category === activeCategory
                ? 'text-primary border-b-2 border-primary' 
                : 'text-secondary hover:text-primary'
            }`}
            onClick={() => setCurrentCategory(category)}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Center section: Logo */}
      <div className="inset-x-0 flex items-center justify-center mx-auto">
        <Link 
          to="/" 
          onClick={() => setCurrentCategory('all')}
          className="text-xl font-bold"
        >
          LOGO
        </Link>
      </div>

      {/* Right section: Cart Button */}
      <button
        data-testid="cart-btn"
        className="relative z-10 p-2 cursor-pointer"
        onClick={() => setCartOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {totalItems > 0 && (
          <div 
            className="absolute flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-sm text-white bg-green-500 rounded-full -top-1 -right-2"
            data-testid="cart-count-bubble"
          >
            {totalItems}
          </div>
        )}
      </button>

      {/* Cart Modal - You can add this if needed */}
      {/* {isCartOpen && (
        <>
          <div 
            className="absolute inset-x-0 z-50 h-screen bg-black opacity-25 top-full -right-20 -left-20"
            onClick={() => setCartOpen(false)}
            data-testid="cart-overlay"
          />
          <CartModal cartItems={cartItems} />
        </>
      )} */}
    </header>
  );
};

export default Header;