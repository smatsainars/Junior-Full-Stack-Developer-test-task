<?php

require_once __DIR__ . '/../../config/bootstrap.php';
require_once __DIR__ . '/DataSeeder.php';

use App\Seeder\DataSeeder;

try {
    echo "Resetting database...\n";

    $connection = $entityManager->getConnection();

    $tables = [
        'attribute_items',
        'product_images',
        'product_prices',
        'product_attributes',
        'products',
        'categories'
    ];

    foreach ($tables as $table) {
        $connection->executeStatement("SET FOREIGN_KEY_CHECKS=0");
        $connection->executeStatement("DROP TABLE IF EXISTS $table");
        $connection->executeStatement("SET FOREIGN_KEY_CHECKS=1");
        echo "  ✓ Dropped table: $table\n";
    }

    $tool = new \Doctrine\ORM\Tools\SchemaTool($entityManager);
    $classes = $entityManager->getMetadataFactory()->getAllMetadata();
    $tool->createSchema($classes);
    echo "✅ Database schema recreated successfully\n";

    echo "\nRunning seeder...\n";
    $seeder = new DataSeeder($entityManager);
    $seeder->seed();

} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}