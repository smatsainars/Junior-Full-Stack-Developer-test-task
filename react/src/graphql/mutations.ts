import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: String!, $attributes: [AttributeInput!], $quantity: Int!) {
    addToCart(productId: $productId, attributes: $attributes, quantity: $quantity)
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($productId: String!, $quantity: Int!) {
    updateCartItem(productId: $productId, quantity: $quantity)
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: String!) {
    removeFromCart(productId: $productId)
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($cartItems: [CartItemInput!]!) {
    createOrder(cartItems: $cartItems)
  }
`;