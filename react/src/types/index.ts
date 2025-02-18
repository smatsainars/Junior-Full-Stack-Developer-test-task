// src/types/index.ts
export interface AttributeItem {
  id: string;
  displayValue: string;
  value: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  gallery: string[];
  description?: string;
  prices: {
    amount: number;
    currency: {
      label: string;
      symbol: string;
    }
  }[];
  attributes?: Attribute[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedAttributes: Record<string, string>;
}