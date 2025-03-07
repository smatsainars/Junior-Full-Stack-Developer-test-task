import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphql/queries';
import ProductGallery from './ProductGallery';
import ProductAttributes from './ProductAttributes';
import { Product } from '../../types';
import { useParams } from 'react-router-dom';

import './ProductDetails.scss';

export interface ProductDetailsProps {
  onAddToCart: (product: Product, selectedAttributes: Record<string, string>) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  onAddToCart
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id }
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

        <ProductGallery gallery={product.gallery} />

        <div className="product-details">
          <div className="product-details-header">
            <h1>{product.name}</h1>
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

          <div className="product-price">
            <h2 className="product-price-title">Price:</h2>
            <p className="product-price-amount">${price.amount.toFixed(2)}</p>
          </div>

          <button
            className={`primary-btn ${
              !product.inStock || !allAttributesSelected
                ? 'disabled'
                : ''
            } text-white`}
            disabled={!product.inStock || !allAttributesSelected}
            onClick={() => onAddToCart(product, selectedAttributes)}
            data-testid="add-to-cart"
          >
            {!product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>

          <div 
            data-testid="product-description"
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description || '' }}
          />
        </div>
    </div>
  );
};

export default ProductDetails;