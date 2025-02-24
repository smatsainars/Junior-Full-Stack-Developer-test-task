// src/components/Cart/CartOverlay.tsx
import React from 'react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '../../types';
import './CartOverlay.scss';

interface CartOverlayProps {
  items: CartItemType[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateAttributes: (id: string, attributeName: string, value: string) => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({
  items,
  onClose,
  onUpdateQuantity,
  onUpdateAttributes
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.prices[0]; // Using first price (USD)
    return sum + (price.amount * item.quantity);
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="wrap-cart-panel">
        <div className="cart-panel">
          <p className="text-lg font-medium mb-4">
            <b>
              My Bag,
            </b>
            {" "} {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>

            {/* Cart Items */}
            {items.length > 0 && (
            <div className="wrap-cart-items">
              {items.map((item, index) => (
              <CartItem
                key={`${item.id}-${index}`}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onUpdateAttributes={onUpdateAttributes}
              />
              ))}
            </div>
            )}

          {/* Total */}
          <div
            data-testid="cart-total"
            className="cart-total"
          >
          <span className="font-semibold">Total:</span> <span>${totalAmount.toFixed(2)}</span>
          </div>

          {/* Actions */}
          
        </div>
        <div className="wrap-cart-action">
            <button
              onClick={onClose}
              className="primary-btn"
            >
              PLACE ORDER
            </button>
          </div>
      </div>
    </>
  );
};

export default CartOverlay;