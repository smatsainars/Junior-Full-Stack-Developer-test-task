// src/types/cart.ts
export interface CartItem {
  id: string;
  name: string;
  brand: string;
  gallery: string[];
  prices: Price[];
  attributes: Attribute[];
  selectedAttributes: Record<string, string>;
  quantity: number;
}

export interface Price {
  amount: number;
  currency: {
    label: string;
    symbol: string;
  };
}

export interface Attribute {
  id: string;
  name: string;
  type: string;
  items: {
    id: string;
    displayValue: string;
    value: string;
  }[];
}