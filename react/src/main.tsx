// main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // if you have global styles
import App from './App.tsx';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Create the Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql', // <-- Adjust to your GraphQL endpoint
  cache: new InMemoryCache()
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

// Render the app
createRoot(rootElement).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
