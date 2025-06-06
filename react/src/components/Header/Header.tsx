import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartItem } from '../../types';
import './Header.scss';
import logo from '../../assets/logo.png';
import emptyCart from '../../assets/empty-cart.svg';

interface HeaderProps {
  toggleCart: () => void;
  cartItems: CartItem[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleCart,
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
      <div className="wrap-navbar-menu">
        {['all', 'tech', 'clothes'].map((category) => (
          <Link
            key={category}
            to={`/${category}`}
            data-testid={category === activeCategory ? 'active-category-link' : 'category-link'}
            className={`link-navbar ${category === activeCategory ? 'active border-b-2' : ''}`}
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
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </Link>
      </div>

      {/* Right section: Cart Button */}
      <button
        className="cart-button"
        data-testid="cart-btn"
        onClick={() => toggleCart()}
      >
        <img src={emptyCart} alt="Cart" className="w-8 h-8" />
        {totalItems > 0 && (
          <div
            className="cart-count"
          >
            {totalItems}
          </div>
        )}
      </button>
    </header>
  );
};

export default Header;