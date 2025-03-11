import { useState, StrictMode } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import CartOverlay from "./components/Cart/CartOverlay";
import { CartItem, Product } from "./types";
import ProductDetails from "./components/ProductDetails/ProductDetails";

// Create Apollo Client
const client = new ApolloClient({
  uri: 'https://juniorfullstackdevelopertesttask.shop/graphql',
  cache: new InMemoryCache()
});

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
  
  const onUpdateAttributes = (index: number, attributeName: string, value: string) => {
    setCartItems(cartItems.map((item, currentIndex) => {
      if (currentIndex === index) {
        return {
          ...item,
          selectedAttributes: {
            ...item.selectedAttributes,
            [attributeName]: value
          }
        };
      }
      return item;
    }));
  }
  
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header 
          setCartOpen={setIsCartOpen}
          cartItems={cartItems}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        
        <main className="wrap-main">
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
                <ProductDetails
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
            onUpdateAttributes={onUpdateAttributes}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

// Entry point
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);

export default App;