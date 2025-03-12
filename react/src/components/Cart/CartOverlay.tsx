import React from 'react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '../../types';
import './CartOverlay.scss';

interface CartOverlayProps {
  items: CartItemType[];
  onClose: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void; // Changed from id to index
  onUpdateAttributes: (index: number, attributeName: string, value: string) => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({
  items,
  onClose,
  onUpdateQuantity,
  onUpdateAttributes
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.prices[0];
    return sum + (price.amount * item.quantity);
  }, 0);

  return (
    <>
      <div
        data-testid='cart-btn'
        className="overlay"
        onClick={onClose}
      />
      
      <div className="wrap-cart-panel">
        <div className="cart-panel">
          <p className="text-lg font-medium mb-4">
            <b>
              My Bag,
            </b>
            {" "} {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          
          {items.length > 0 && (
            <div className="wrap-cart-items">
              {items.map((item, index) => (
                <CartItem
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index}
                  onUpdateQuantity={onUpdateQuantity}
                  onUpdateAttributes={(name, value) => onUpdateAttributes(index, name, value)}
                />
              ))}
            </div>
          )}
          
          <div
            data-testid='cart-total'
            className="cart-total"
          >
            <span className="font-semibold">Total:</span> <span>${totalAmount.toFixed(2)}</span>
          </div>
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