import React from 'react';
import { useParams } from 'react-router-dom';

interface ProductDetailsWrapperProps {
  onAddToCart?: (productId: string) => void;
}

const ProductDetailsWrapper: React.FC<ProductDetailsWrapperProps> = ({
  onAddToCart,
}) => {
  const { id } = useParams();

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
