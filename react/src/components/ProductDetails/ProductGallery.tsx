// src/components/ProductDetails/ProductGallery.tsx
import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div data-testid="product-gallery" className="flex gap-8">
      {/* Thumbnail List */}
      <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 border-2 ${
              selectedImage === index ? 'border-green-500' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <img
          src={images[selectedImage]}
          alt="Product main view"
          className="w-full h-[600px] object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(prev => 
                prev === 0 ? images.length - 1 : prev - 1
              )}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImage(prev => 
                prev === images.length - 1 ? 0 : prev + 1
              )}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;