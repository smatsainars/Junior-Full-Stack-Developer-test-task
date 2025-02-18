// src/components/Cart/CartOverlay.tsx
import React from 'react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '../../types';

interface CartOverlayProps {
  items: CartItemType[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({
  items,
  onClose,
  onUpdateQuantity
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
        className="fixed inset-0 bg-black bg-opacity-20"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-16 w-96 max-h-[calc(100vh-4rem)] bg-white shadow-xl z-50 overflow-auto">
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4">
            My Bag, {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </h2>

          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <CartItem
                key={`${item.id}-${index}`}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>

          {/* Total */}
          <div 
            data-testid="cart-total"
            className="font-medium mt-4"
          >
            Total: ${totalAmount.toFixed(2)}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              VIEW BAG
            </button>
            <button
              className={`flex-1 py-2 ${
                items.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-opacity-90'
              } text-white`}
              disabled={items.length === 0}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;