// src/App.tsx
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "./config/apollo";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductDetailsWrapper from "./components/ProductDetails/ProductDetailsWrapper";
import CartOverlay from "./components/Cart/CartOverlay";
import { CartItem, Product } from "./types";

function App() {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product, selectedAttributes: Record<string, string>) => {
    const existingItemIndex = cartItems.findIndex(item => 
      item.id === product.id && 
      JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
    );

    if (existingItemIndex > -1) {
      const newItems = [...cartItems];
      newItems[existingItemIndex].quantity += 1;
      setCartItems(newItems);
    } else {
      setCartItems([...cartItems, {
        ...product,
        selectedAttributes,
        quantity: 1
      }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateCartItem = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header 
            setCartOpen={setIsCartOpen}
            cartItems={cartItems}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <ProductList
                    category={currentCategory}
                    onAddToCart={handleAddToCart}
                  />
                } 
              />
              <Route 
                path="/category/:category" 
                element={
                  <ProductList
                    category={currentCategory}
                    onAddToCart={handleAddToCart}
                  />
                } 
              />
              <Route 
                path="/product/:id" 
                element={
                  <ProductDetailsWrapper
                    onAddToCart={handleAddToCart}
                  />
                } 
              />
            </Routes>
          </main>

          {isCartOpen && (
            <CartOverlay
              items={cartItems}
              onClose={() => setIsCartOpen(false)}
              onUpdateQuantity={handleUpdateCartItem}
            />
          )}
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;