import React from 'react';
import { CartItem as CartItemType } from '../../types';
import './CartItem.scss';

interface CartItemProps {
  item: CartItemType;
  index: number;
  onUpdateQuantity: (index: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  index,
  onUpdateQuantity,
}) => {
  const price = item.prices[0];
  
 
  
  return (
    <div className="cart-item">
      <div className="cart-item__details">
        <p className="cart-item__title">{item.name}</p>
        <p className="cart-item__price">${price.amount.toFixed(2)}</p>
        
        {item.attributes?.map((attr) => (
          <div
            key={attr.name}
            data-testid={`cart-item-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="cart-item__attributes"
          >
            <p className="attribute-label">{attr.name}:</p>
            <div className="attribute-options">
              {attr.type === 'swatch' ? (
                attr.items.map((option) => (
                  <div
                    key={`${attr.name}-${option.value}`}
                    data-testid={`cart-item-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}-${option.value.toLowerCase().replace(/\s+/g, '-')}${
                      item.selectedAttributes[attr.name] === option.value ? '-selected' : ''
                    }`}
                    className={`color-btn ${
                      item.selectedAttributes[attr.name] === option.value ? 'active' : ''
                    }`}
                    style={{ backgroundColor: option.value }}
                  />
                ))
              ) : (
                attr.items.map((option) => (
                  <div
                    key={`${attr.name}-${option.value}`}
                    data-testid={`cart-item-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}-${option.value.toLowerCase().replace(/\s+/g, '-')}${
                      item.selectedAttributes[attr.name] === option.value ? '-selected' : ''
                    }`}
                    className={`btn-size ${
                      item.selectedAttributes[attr.name] === option.value ? 'active' : ''
                    }`}
                  >
                    {option.displayValue}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-item__actions">
        <div className="cart-item__quantity">
          <button
            data-testid="cart-item-amount-increase"
            className="quantity-btn"
            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
          >
            +
          </button>
          <span data-testid="cart-item-amount" className="quantity-value">
            {item.quantity}
          </span>
          <button
            data-testid="cart-item-amount-decrease"
            className="quantity-btn"
            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
          >
            -
          </button>
        </div>
        <img
          src={item.gallery[0]}
          alt={item.name}
          className="cart-item__image"
        />
      </div>
    </div>
  );
};

export default CartItem;