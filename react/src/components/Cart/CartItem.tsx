// src/components/Cart/CartItem.tsx
import React from 'react';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
}) => {
  const price = item.prices[0];

  return (
    <div className="flex justify-between items-start py-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{item.brand}</h3>
        <p className="mt-1">{item.name}</p>
        <p className="mt-2 font-medium">
          ${price.amount.toFixed(2)}
        </p>

        {/* Attributes */}
        {item.attributes?.map((attr) => (
          <div 
            key={attr.name}
            data-testid={`cart-item-attribute-${attr.name.toLowerCase()}`}
            className="mt-3"
          >
            <p className="text-xs uppercase font-medium">{attr.name}:</p>
            <div className="flex gap-2 mt-1">
              {attr.items.map((option) => (
                <button
                  key={`${attr.name}-${option.value}`}
                  data-testid={`cart-item-attribute-${attr.name.toLowerCase()}-${option.value.toLowerCase()}${
                    item.selectedAttributes[attr.name] === option.value ? '-selected' : ''
                  }`}
                  className={`px-2 py-1 text-xs border ${
                    item.selectedAttributes[attr.name] === option.value
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  }`}
                  disabled
                >
                  {option.displayValue}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Quantity Controls */}
        <div className="flex flex-col justify-between items-center">
          <button
            data-testid="cart-item-amount-increase"
            className="w-6 h-6 border flex items-center justify-center hover:bg-black hover:text-white"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
          <span data-testid="cart-item-amount">{item.quantity}</span>
          <button
            data-testid="cart-item-amount-decrease"
            className="w-6 h-6 border flex items-center justify-center hover:bg-black hover:text-white"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
        </div>

        {/* Product Image */}
        <img
          src={item.gallery[0]}
          alt={item.name}
          className="w-24 h-24 object-cover"
        />
      </div>
    </div>
  );
};

export default CartItem;