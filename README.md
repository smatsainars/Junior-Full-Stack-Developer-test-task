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
- PHP 8.1 or higher
- MySQL 5.6 or higher
- Node.js and npm
- Composer

## OOP Approach and Architecture

The backend implementation follows object-oriented programming principles:
- **Inheritance** - Used for extending base product and attribute classes
- **Polymorphism** - Different product types handled by specialized classes
- **Encapsulation** - Data and behavior contained within appropriate classes
- **PSR Compliance** - Code follows PSR-1, PSR-4, and PSR-12 standards

Doctrine ORM is used to map database tables to PHP objects, providing a clean abstraction layer for database operations.

## GraphQL Implementation

The API uses GraphQL to provide efficient data retrieval:
- **Schema** - Defines the structure of available data
- **Queries** - For fetching categories and products
- **Mutations** - For placing orders
- **Resolvers** - Handle the logic for each query and mutation

## Acknowledgements

This project was created as a test task for a Junior Full Stack Developer position. The project requirements and design were provided as part of the assignment.
