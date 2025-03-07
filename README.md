# Junior Full Stack E-commerce Project

A simple e-commerce website featuring product listing and cart functionality, built with React, GraphQL, PHP, and MySQL.

## Overview

This project is a full-stack e-commerce application built as part of a Junior Full Stack Developer test task. It demonstrates a single-page application with core e-commerce functionalities including:

- Product listing by categories
- Product details view
- Shopping cart functionality
- Order placement

## Technologies Used

### Frontend
- **React** - Used for building the UI as a single-page application
- **Apollo Client** - GraphQL client for data fetching and state management
- **SCSS** - For advanced styling capabilities
- **TypeScript** - For type safety and enhanced developer experience
- **Vite** - For fast development and optimized production builds

### Backend
- **PHP 8.1+** - Server-side programming language
- **MySQL** - Database for storing product and order information
- **GraphQL** - API query language for efficient data retrieval
- **Doctrine** - ORM for database interactions
- **Dotenv** - For environment variable management
- **Composer** - For PHP dependency management

## Features

### Product Listing
- Display products grouped by categories
- Quick shop functionality
- Visual indication for out-of-stock products
- Interactive product cards

### Product Details
- Full product information display
- Product image gallery
- Product attributes selection (size, color, etc.)
- Add to cart functionality

### Shopping Cart
- Cart overlay accessible from all pages
- Add/remove products
- Update product quantities
- Display product details in cart
- Calculate cart totals
- Place order functionality

## Project Structure

### Frontend
```
/react
  /public        # Static files
  /src
    /assets      # Images and SVGs
    /components  # React components
      /Cart      # Cart-related components
      /Header    # Header component
      /ProductDetails # Product details components
      /ProductList    # Product listing components
    /config      # Configuration files
    /graphql     # GraphQL queries and mutations
    /types       # TypeScript type definitions
```

### Backend
```
/api
  /config        # Configuration files
  /public        # Public entry point
  /src
    /Controller  # Request handlers
    /Entity      # Database entity models
    /GraphQL     # GraphQL schema definitions
      /Mutation  # Mutation resolvers
      /Query     # Query resolvers
      /Types     # GraphQL type definitions
    /Seeder      # Database seeders
  /vendor        # Dependencies (managed by Composer)
```

## Installation and Setup

### Prerequisites
- PHP 8.x or higher
- MySQL 5.x or higher
- Node.js v22.x or higher and npm
- Composer 2.x or higher

### Backend Setup
1. Clone the repository
   ```
   git clone https://github.com/yourusername/junior-fullstack-ecommerce.git
   cd junior-fullstack-ecommerce
   ```

2. Install PHP dependencies
   ```
   cd api
   composer install
   ```

3. Configure environment variables
   ```
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials

4. Set up the database
   ```
   php src/Seeder/reset-db.php
   php src/Seeder/DataSeeder.php
   ```

5. Start the PHP server
   ```
   php -S localhost:8000 -t public
   ```

### Frontend Setup
1. Navigate to the frontend directory
   ```
   cd react
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

## Acknowledgements

This project was created as a test task for a Junior Full Stack Developer position. The project requirements and design were provided as part of the assignment.
