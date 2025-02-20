// src/components/ProductDetails/ProductDetails.tsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphql/queries';
import ProductGallery from './ProductGallery';
import ProductAttributes from './ProductAttributes';
import { Product } from '../../types';

export interface ProductDetailsProps {
  productId: string;
  onAddToCart: (product: Product, selectedAttributes: Record<string, string>) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productId,
  onAddToCart
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId }
  });

  if (loading) return (
    <div className="flex justify-center items-center min-h-[600px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500">
      Error loading product details
    </div>
  );

  const product = data?.product as Product;
  if (!product) return null;

  const price = product.prices[0];
  const allAttributesSelected = product.attributes?.every((attr) => 
    selectedAttributes[attr.name]
  ) ?? true;

  return (
    <div className="wrap-product-details">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery images={product.gallery} />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light">{product.name}</h1>
            <p className="text-xl mt-1">{product.brand}</p>
          </div>

          {product.attributes && (
            <ProductAttributes
              attributes={product.attributes}
              selectedAttributes={selectedAttributes}
              onChange={(name, value) => 
                setSelectedAttributes(prev => ({ ...prev, [name]: value }))
              }
            />
          )}

          <div>
            <h2 className="text-sm font-semibold uppercase mb-2">Price:</h2>
            <p className="text-2xl">${price.amount.toFixed(2)}</p>
          </div>

          <button
            data-testid="add-to-cart"
            className={`w-full py-3 ${
              !product.inStock || !allAttributesSelected
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-opacity-90'
            } text-white`}
            disabled={!product.inStock || !allAttributesSelected}
            onClick={() => onAddToCart(product, selectedAttributes)}
          >
            {!product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>

          <div 
            data-testid="product-description"
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description || '' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;