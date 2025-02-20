// src/components/Cart/CartItem.tsx
import React from 'react';
import { CartItem as CartItemType } from '../../types';
import './CartItem.scss';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateAttributes: (id: string, attributeName: string, value: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity,
  onUpdateAttributes 
}) => {
  const price = item.prices[0];

  const handleAttributeChange = (attributeName: string, value: string) => {
    onUpdateAttributes(item.id, attributeName, value);
  };

  return (
    <div className="cart-item">
      <div className="cart-item__details">
        <p>{item.name}</p>
        <p className="cart-item__price">${price.amount.toFixed(2)}</p>
        {item.attributes?.map((attr) => (
          <div
            key={attr.name}
            data-testid={`cart-item-attribute-${attr.name.toLowerCase()}`}
            className="cart-item__attributes"
          >
            <p className="attribute-label">{attr.name}:</p>
            <div className="attribute-options">
              {attr.items.map((option) => (
                <button
                  key={`${attr.name}-${option.value}`}
                  data-testid={`cart-item-attribute-${attr.name.toLowerCase()}-${option.value.toLowerCase()}${
                    item.selectedAttributes[attr.name] === option.value ? '-selected' : ''
                  }`}
                  className={`option ${
                    item.selectedAttributes[attr.name] === option.value ? 'selected' : ''
                  }`}
                  onClick={() => handleAttributeChange(attr.name, option.value)}
                >
                  {option.displayValue}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-item__quantity">
          <button
            data-testid="cart-item-amount-increase"
            className="quantity-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
          <span data-testid="cart-item-amount" className="quantity-value">
            {item.quantity}
          </span>
          <button
            data-testid="cart-item-amount-decrease"
            className="quantity-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
        </div>
      <div className="cart-item__actions">

        <img
          src={item.gallery[0]}
          alt={item.name}
          className="cart-item__image"
        />
      </div>

      <style>{`
        .cart-item {
          display: flex;
          padding: 1rem;
          border-bottom: 1px solid #eee;
          gap: 8px;
        }

        .cart-item__details {
          flex: 1;
          p{
            margin: 0;
            }
        }

        .cart-item__title {
          margin: 0;
          font-size: 1.2rem;
        }

        .cart-item__price {
          font-weight: bold;
          margin: 0.5rem 0;
        }

        .cart-item__attributes {
        }

        .attribute-label {
          font-size: 0.9rem;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .attribute-options {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          flex-direction: column;
        }

        .option {
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          background: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option:hover {
          background: #f5f5f5;
        }

        .option.selected {
          background: #2b2b2b;
          color: white;
          border-color: #2b2b2b;
        }

        .cart-item__actions {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-left: 1rem;
        }

        .cart-item__quantity {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .quantity-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          background: none;
          cursor: pointer;
        }

        .quantity-btn:hover {
          background: #f5f5f5;
        }

        .quantity-value {
          font-size: 1rem;
          font-weight: bold;
        }

        .cart-item__image {
          width: 120px;
          height: 120px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default CartItem;