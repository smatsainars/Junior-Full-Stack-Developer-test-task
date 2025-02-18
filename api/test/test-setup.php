<?php

require_once __DIR__ . '/../config/bootstrap.php';

try {
    // Test database connection by making a simple query
    $connection = $entityManager->getConnection();
    $result = $connection->executeQuery('SELECT 1')->fetchOne();
    
    if ($result === 1) {
        echo "✅ Database connection successful!\n";
    }

    // Get the Schema Tool
    $schemaManager = $connection->createSchemaManager();
    
    // Get list of existing tables
    $existingTables = $schemaManager->listTables();
    echo "\nExisting tables:\n";
    foreach ($existingTables as $table) {
        echo "- " . $table->getName() . "\n";
    }

    echo "\nChecking entity mappings...\n";
    // Check entity mappings
    $entityClasses = [
        \App\Entity\Product::class,
        \App\Entity\Category::class,
        \App\Entity\ProductAttribute::class,
        \App\Entity\AttributeItem::class,
        \App\Entity\ProductImage::class,
        \App\Entity\ProductPrice::class,
    ];

    foreach ($entityClasses as $entityClass) {
        $metadata = $entityManager->getClassMetadata($entityClass);
        echo "✅ {$entityClass} mapping validated\n";
        
        // Show fields and relationships
        echo "   Fields:\n";
        foreach ($metadata->fieldMappings as $field) {
            echo "   - {$field['fieldName']} ({$field['type']})\n";
        }
        
        echo "   Relationships:\n";
        foreach ($metadata->associationMappings as $association) {
            echo "   - {$association['fieldName']} ({$association['type']})\n";
        }
        echo "\n";
    }

    // Create database schema if it doesn't exist
    echo "Checking database schema...\n";
    
    // Drop existing tables in correct order
    $dropOrder = [
        'attribute_items',
        'product_images',
        'product_prices',
        'product_attributes',
        'products',
        'categories'
    ];

    echo "Dropping existing tables...\n";
    foreach ($dropOrder as $tableName) {
        try {
            $connection->executeStatement("SET FOREIGN_KEY_CHECKS=0");
            $connection->executeStatement("DROP TABLE IF EXISTS $tableName");
            $connection->executeStatement("SET FOREIGN_KEY_CHECKS=1");
            echo "✅ Dropped table: $tableName\n";
        } catch (\Exception $e) {
            echo "⚠️ Could not drop table $tableName: {$e->getMessage()}\n";
        }
    }

    echo "\nCreating new schema...\n";
    $tool = new \Doctrine\ORM\Tools\SchemaTool($entityManager);
    $classes = $entityManager->getMetadataFactory()->getAllMetadata();
    
    // Create new schema
    $tool->createSchema($classes);
    echo "✅ Database schema created successfully\n";

} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}