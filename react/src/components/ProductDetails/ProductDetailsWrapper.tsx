// src/components/ProductDetailsWrapper.tsx

import React from 'react';
import { useParams } from 'react-router-dom';

// 1) Notice there's no import for `Product` here since we don't use it.

interface ProductDetailsWrapperProps {
  onAddToCart?: (productId: string) => void;
}

const ProductDetailsWrapper: React.FC<ProductDetailsWrapperProps> = ({
  onAddToCart,
}) => {
  // 2) Grab the product ID from the URL (if your route is /product/:id)
  const { id } = useParams();

  // 3) This is just a placeholder example returning some basic UI
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Product Details</h1>
      <p>Product ID from URL: {id}</p>
      <button
        onClick={() => onAddToCart }
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailsWrapper;
