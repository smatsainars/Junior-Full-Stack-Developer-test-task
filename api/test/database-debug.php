<?php

require_once __DIR__ . '/../config/bootstrap.php';

use App\Entity\{Category, Product};

try {
    $entityManager->getConnection()->executeQuery('SELECT 1');
    echo "Database connection successful\n";

    $categories = $entityManager->getRepository(Category::class)->findAll();
    echo "\nCategories in database: " . count($categories) . "\n";
    foreach ($categories as $category) {
        echo "- " . $category->getName() . "\n";
    }

    $products = $entityManager->getRepository(Product::class)->findAll();
    echo "\nProducts in database: " . count($products) . "\n";
    foreach ($products as $product) {
        echo "- " . $product->getName() . " (ID: " . $product->getId() . ")\n";
    }

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}