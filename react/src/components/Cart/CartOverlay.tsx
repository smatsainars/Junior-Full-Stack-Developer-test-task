import React from 'react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '../../types';
import './CartOverlay.scss';
import { useMutation, gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation CreateOrder($cartItems: [CartItemInput!]!) {
    createOrder(cartItems: $cartItems)
  }
`;

interface CartOverlayProps {
  items: CartItemType[];
  onClose: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onClearCart: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({
  items,
  onClose,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.prices?.[0];
    if (!price) return sum;
    return sum + (price.amount * item.quantity);
  }, 0);

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const cartItems = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        selectedAttributes: JSON.stringify(item.selectedAttributes || {})
      }));

      await createOrder({
        variables: { cartItems }
      });

      onClearCart();
      onClose();
      alert('Order placed successfully!');

    } catch (err) {
      alert('Order failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <>
      <div
        data-testid="cart-overlay"
        className="overlay"
        onClick={onClose}
      />

      <div className="wrap-cart-panel">
        <div className="cart-panel">
          <p className="text-lg font-medium mb-4">
            <b>My Bag,</b>{' '}
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>

          {items.length > 0 ? (
            <div className="wrap-cart-items">
              {items.map((item, index) => (
                <CartItem
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          )}

          <div data-testid="cart-total" className="cart-total">
            <span className="font-semibold">Total:</span>{' '}
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="wrap-cart-action">
          <button
            onClick={handlePlaceOrder}
            className="primary-btn"
            disabled={loading || items.length === 0}
          >
            {loading ? 'Placing Order...' : 'PLACE ORDER'}
          </button>
        </div>

        {error && (
          <div className="error-message" style={{ color: 'red', padding: '10px' }}>
            <p>Failed to place order: {error.message}</p>
            <button onClick={handlePlaceOrder} disabled={loading}>
              Try Again
            </button>
          </div>
        )}

        {data && (
          <div className="success-message" style={{ color: 'green', padding: '10px' }}>
            <h4>Order Summary:</h4>
            <ul>
              {data.createOrder.map((line: string, index: number) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CartOverlay;