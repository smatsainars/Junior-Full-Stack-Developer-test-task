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
  const enhancedAttributes = attributes.map((attr, index) => ({
    ...attr,
    _uniqueKey: attr.id || `attr-${attr.name}-${index}`
  }));

  return (
    <div className="product-attributes">
      {enhancedAttributes.map((attribute) => (
        <div 
          className="product-attribute"
          key={attribute._uniqueKey}
          data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <h3 className="text-sm font-semibold uppercase mb-2">{attribute.name}:</h3>
          <div className="wrap-attribute-items">
            {attribute.type === 'swatch' ? (
              attribute.items.map((item, itemIndex) => (
                <button
                  key={`${attribute._uniqueKey}-item-${item.id || item.value || itemIndex}`}
                  onClick={() => onChange(attribute.name, item.value)}
                  className={`color-btn ${
                    selectedAttributes[attribute.name] === item.value
                      ? 'active'
                      : ''
                  }`}
                  style={{ backgroundColor: item.value }}
                  title={item.displayValue}
                  data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}-${item.value.toLowerCase().replace(/\s+/g, '-')}`}
                />
              ))
            ) : (
              attribute.items.map((item, itemIndex) => (
                <button
                  key={`${attribute._uniqueKey}-item-${item.id || item.value || itemIndex}`}
                  onClick={() => onChange(attribute.name, item.value)}
                  className={`btn-size ${
                    selectedAttributes[attribute.name] === item.value
                      ? 'active'
                      : ''
                  }`}
                  data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}-${item.value.toLowerCase().replace(/\s+/g, '-')}`}
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