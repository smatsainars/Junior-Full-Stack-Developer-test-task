<?php

namespace App\Seeder;

require_once __DIR__ . '/../../config/bootstrap.php';

use App\Entity\{Product, Category, ProductAttribute, AttributeItem, ProductImage, ProductPrice};

class DataSeeder
{
    private $entityManager;
    private $data;
    private $categories = [];

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
        $this->data = json_decode(file_get_contents(__DIR__ . '/../../data.json'), true)['data'];
    }

    public function seed()
    {
        // Clear existing data
        $connection = $this->entityManager->getConnection();
        $connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');
        $connection->executeStatement('TRUNCATE TABLE attribute_items');
        $connection->executeStatement('TRUNCATE TABLE product_attributes');
        $connection->executeStatement('TRUNCATE TABLE product_images');
        $connection->executeStatement('TRUNCATE TABLE product_prices');
        $connection->executeStatement('TRUNCATE TABLE products');
        $connection->executeStatement('TRUNCATE TABLE categories');
        $connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');

        $this->seedCategories();
        $this->seedProducts();
        
        $this->entityManager->flush();
        echo "✅ Database seeded successfully!\n";
    }

    private function seedCategories()
    {
        foreach ($this->data['categories'] as $categoryData) {
            $category = new Category();
            $category->setName($categoryData['name']);
            $this->entityManager->persist($category);
            $this->categories[$categoryData['name']] = $category;
        }
        $this->entityManager->flush();
        echo "✅ Categories seeded\n";
    }

    private function seedProducts()
    {
        foreach ($this->data['products'] as $productData) {
            $product = new Product();
            $product->setId($productData['id']);
            $product->setName($productData['name']);
            $product->setInStock($productData['inStock']);
            $product->setDescription($productData['description']);
            $product->setBrand($productData['brand']);

            // Set category
            if (isset($productData['category']) && isset($this->categories[$productData['category']])) {
                $product->setCategory($this->categories[$productData['category']]);
            }

            // Add images
            foreach ($productData['gallery'] as $imageUrl) {
                $image = new ProductImage();
                $image->setUrl($imageUrl);
                $image->setProduct($product);
                $this->entityManager->persist($image);
            }

            // Add attributes
            if (isset($productData['attributes'])) {
                foreach ($productData['attributes'] as $attributeData) {
                    $attribute = new ProductAttribute();
                    $attribute->setName($attributeData['name']);
                    $attribute->setType($attributeData['type']);
                    $attribute->setProduct($product);

                    foreach ($attributeData['items'] as $itemData) {
                        $item = new AttributeItem();
                        $item->setDisplayValue($itemData['displayValue']);
                        $item->setValue($itemData['value']);
                        $item->setItemId($itemData['id']);
                        $item->setAttribute($attribute);
                        $this->entityManager->persist($item);
                    }

                    $this->entityManager->persist($attribute);
                }
            }

            // Add price
            if (isset($productData['prices'][0])) {
                $priceData = $productData['prices'][0];
                $price = new ProductPrice();
                $price->setAmount($priceData['amount']);
                $price->setCurrencyLabel($priceData['currency']['label']);
                $price->setCurrencySymbol($priceData['currency']['symbol']);
                $price->setProduct($product);
                $this->entityManager->persist($price);
            }

            $this->entityManager->persist($product);
            echo "✅ Seeded product: {$productData['name']}\n";
        }
    }
}

// Run seeder if file is executed directly
if (basename(__FILE__) === basename($_SERVER["SCRIPT_FILENAME"])) {
    $entityManager = require __DIR__ . '/../../config/bootstrap.php';
    $seeder = new DataSeeder($entityManager);
    $seeder->seed();
}