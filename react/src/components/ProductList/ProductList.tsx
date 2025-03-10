import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import ProductCard from './ProductCard';
import { Product } from '../../types';
import './ProductList.scss';

interface ProductListProps {
  category: string;
  onAddToCart: (product: Product, selectedAttributes: Record<string, string>) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  category,
  onAddToCart,
}) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category: category === 'all' ? null : category },
  });


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  if (!data || !data.products || data.products.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No products found for category: {category}
      </div>
    );
  }

  return (
    <div>
      <h1 className="title-main">
        {category}
      </h1>
      <div className="wrap-products">
        {data.products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
