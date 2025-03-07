import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import './ProductCard.scss';

import cartbtn from '../../assets/cart-btn.svg';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedAttributes: Record<string, string>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const price = product.prices[0]; 

  const getDefaultAttributes = () => {
    const defaultAttrs: Record<string, string> = {};
    if (product.attributes) {
      product.attributes.forEach(attr => {
        if (attr.items && attr.items.length > 0) {
          defaultAttrs[attr.name] = attr.items[0].value;
        }
      });
    }
    return defaultAttrs;
  };

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart(product, getDefaultAttributes());
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="wrap-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`wrap-img ${!product.inStock && 'opacity-50'}`}>
        <img 
          src={product.gallery[0]} 
          alt={product.name}
        />
        
        {!product.inStock && (
          <div className="wrap-out-of-stock">
            <span className="text-lg font-medium text-gray-500">OUT OF STOCK</span>
          </div>
        )}

        {product.inStock && isHovered && (
          <button
            onClick={handleQuickAdd}
            className="btn-quick-add"
          >
            <img src={cartbtn} alt="Add to cart" />
          </button>
        )}
      </div>

      <div className="wrap-product-info">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-lg font-medium mt-1">
          ${price.amount.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;