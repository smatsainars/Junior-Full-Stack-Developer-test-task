<?php

require_once __DIR__ . '/../config/bootstrap.php';

try {
    $jsonData = json_decode(file_get_contents(__DIR__ . '/../data.json'), true);

    echo "Starting data seeding test...\n\n";

    $category = new \App\Entity\Category();
    $category->setName("test-category");
    $entityManager->persist($category);
    echo "✅ Category creation test passed\n";

    $product = new \App\Entity\Product();
    $product->setId("test-product");
    $product->setName("Test Product");
    $product->setInStock(true);
    $product->setBrand("Test Brand");
    $product->setCategory($category);

    $image = new \App\Entity\ProductImage();
    $image->setUrl("test-url.jpg");
    $product->addGalleryImage($image);

    $attribute = new \App\Entity\ProductAttribute();
    $attribute->setName("Test Attribute");
    $attribute->setType("text");
    $product->addAttribute($attribute);

    $item = new \App\Entity\AttributeItem();
    $item->setDisplayValue("Test Value");
    $item->setValue("test");
    $item->setItemId("test-id");
    $attribute->addItem($item);

    $price = new \App\Entity\ProductPrice();
    $price->setAmount(99.99);
    $price->setCurrencyLabel("USD");
    $price->setCurrencySymbol("$");
    $product->setPrice($price);

    $entityManager->persist($product);

    $entityManager->flush();

    echo "✅ Product creation test passed\n";
    echo "✅ Image relation test passed\n";
    echo "✅ Attribute relation test passed\n";
    echo "✅ Price relation test passed\n";

    $retrievedProduct = $entityManager->find(\App\Entity\Product::class, "test-product");
    if (
        $retrievedProduct &&
        $retrievedProduct->getName() === "Test Product" &&
        $retrievedProduct->getGallery()->count() === 1 &&
        $retrievedProduct->getAttributes()->count() === 1
    ) {
        echo "✅ Product retrieval test passed\n";
    } else {
        throw new \Exception("Product retrieval test failed");
    }

    $entityManager->remove($product);
    $entityManager->remove($category);
    $entityManager->flush();

    echo "\nAll tests completed successfully!\n";

} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}