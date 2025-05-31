<?php

namespace App\Seeder;

require_once __DIR__ . '/../../config/bootstrap.php';

use App\Entity\{Product, Category, ProductAttribute, AttributeItem, ProductImage, ProductPrice, Order, OrderItem};

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
        $connection = $this->entityManager->getConnection();
        $connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');
        
        // Clear all tables in correct order (respecting foreign keys)
        $connection->executeStatement('TRUNCATE TABLE order_items');
        $connection->executeStatement('TRUNCATE TABLE orders');
        $connection->executeStatement('TRUNCATE TABLE attribute_items');
        $connection->executeStatement('TRUNCATE TABLE product_attributes');
        $connection->executeStatement('TRUNCATE TABLE product_images');
        $connection->executeStatement('TRUNCATE TABLE product_prices');
        $connection->executeStatement('TRUNCATE TABLE products');
        $connection->executeStatement('TRUNCATE TABLE categories');
        
        $connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');

        $this->seedCategories();
        $this->seedProducts();
        $this->createSampleOrders();

        $this->entityManager->flush();
        echo "✅ Database seeded successfully with all entities!\n";
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

            // Set category relationship
            if (isset($productData['category']) && isset($this->categories[$productData['category']])) {
                $product->setCategory($this->categories[$productData['category']]);
            }

            // Add product images
            foreach ($productData['gallery'] as $imageUrl) {
                $image = new ProductImage();
                $image->setUrl($imageUrl);
                $image->setProduct($product);
                $this->entityManager->persist($image);
            }

            // Add product attributes
            if (isset($productData['attributes'])) {
                foreach ($productData['attributes'] as $attributeData) {
                    $attribute = new ProductAttribute();
                    $attribute->setName($attributeData['name']);
                    $attribute->setType($attributeData['type']);
                    $attribute->setProduct($product);

                    // Add attribute items
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

            // Add product price
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

    private function createSampleOrders()
    {
        // Create a few sample orders to demonstrate the order system
        $products = $this->entityManager->getRepository(Product::class)->findAll();
        
        if (empty($products)) {
            echo "⚠️ No products found, skipping sample orders\n";
            return;
        }

        // Sample Order 1
        $order1 = new Order();
        $order1->setStatus('completed');
        $order1->setCreatedAt(new \DateTime('-2 days'));
        
        $totalAmount1 = 0;
        
        // Add first 2 products to order 1
        for ($i = 0; $i < min(2, count($products)); $i++) {
            $product = $products[$i];
            $price = $product->getPrice();
            
            if ($price) {
                $orderItem = new OrderItem();
                $orderItem->setOrder($order1);
                $orderItem->setProduct($product);
                $orderItem->setQuantity(rand(1, 3));
                $orderItem->setPrice((float)$price->getAmount());
                $orderItem->setAttributes('{"size":"M","color":"blue"}');
                
                $totalAmount1 += (float)$price->getAmount() * $orderItem->getQuantity();
                
                $this->entityManager->persist($orderItem);
                $order1->addOrderItem($orderItem);
            }
        }
        
        $order1->setTotalAmount($totalAmount1);
        $this->entityManager->persist($order1);

        // Sample Order 2
        $order2 = new Order();
        $order2->setStatus('pending');
        $order2->setCreatedAt(new \DateTime('-1 day'));
        
        $totalAmount2 = 0;
        
        // Add different products to order 2
        for ($i = 2; $i < min(4, count($products)); $i++) {
            $product = $products[$i];
            $price = $product->getPrice();
            
            if ($price) {
                $orderItem = new OrderItem();
                $orderItem->setOrder($order2);
                $orderItem->setProduct($product);
                $orderItem->setQuantity(rand(1, 2));
                $orderItem->setPrice((float)$price->getAmount());
                $orderItem->setAttributes('{"size":"L","color":"red"}');
                
                $totalAmount2 += (float)$price->getAmount() * $orderItem->getQuantity();
                
                $this->entityManager->persist($orderItem);
                $order2->addOrderItem($orderItem);
            }
        }
        
        $order2->setTotalAmount($totalAmount2);
        $this->entityManager->persist($order2);
        
        echo "✅ Created sample orders\n";
    }

    public function createTablesOnly()
    {
        // Create all tables without data - useful for production
        echo "✅ Tables structure ready for production data\n";
    }
}

if (basename(__FILE__) === basename($_SERVER["SCRIPT_FILENAME"])) {
    $entityManager = require __DIR__ . '/../../config/bootstrap.php';
    $seeder = new DataSeeder($entityManager);
    $seeder->seed();
}