// src/components/ProductList/ProductCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedAttributes: Record<string, string>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const price = product.prices[0]; // Using first price (USD)

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
      data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
      className="block relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${!product.inStock && 'opacity-50'}`}>
        <img 
          src={product.gallery[0]} 
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-500">OUT OF STOCK</span>
          </div>
        )}

        {product.inStock && isHovered && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.brand}</p>
        <p className="text-lg font-medium mt-1">
          ${price.amount.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;