// src/components/ProductDetails/ProductAttributes.tsx
import React from 'react';
import { Attribute } from '../../types';

interface ProductAttributesProps {
  attributes: Attribute[];
  selectedAttributes: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

const ProductAttributes: React.FC<ProductAttributesProps> = ({
  attributes,
  selectedAttributes,
  onChange
}) => {
  return (
    <div className="space-y-4">
      {attributes.map(attribute => (
        <div 
          key={attribute.id}
          data-testid={`product-attribute-${attribute.name.toLowerCase()}`}
        >
          <h3 className="text-sm font-semibold uppercase mb-2">{attribute.name}:</h3>
          <div className="flex flex-wrap gap-2">
            {attribute.type === 'swatch' ? (
              // Color swatches
              attribute.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onChange(attribute.name, item.value)}
                  className={`w-8 h-8 border-2 ${
                    selectedAttributes[attribute.name] === item.value
                      ? 'border-green-500'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: item.value }}
                  title={item.displayValue}
                />
              ))
            ) : (
              // Regular buttons (text, size, etc)
              attribute.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onChange(attribute.name, item.value)}
                  className={`px-3 py-2 border ${
                    selectedAttributes[attribute.name] === item.value
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {item.displayValue}
                </button>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAttributes;