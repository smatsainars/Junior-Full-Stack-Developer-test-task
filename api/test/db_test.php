<?php
// Test different Hostinger database hosts
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dbname = 'u18365752_scandiweb';
$username = 'u18365752_juniorfullstac';
$password = '72x7IhjyTCEe3X9';
$port = 3306;

// Common Hostinger database hosts
$hosts = [
    'localhost',
    'mysql.hostinger.com',
    'mysql.hostinger.ro',
    'mysql.hostinger.in',
    'mysql.hostinger.co.uk',
    'mysql.hostinger.es',
    'mysql.hostinger.com.br'
];

echo "🔍 Testing database connections...\n\n";

foreach ($hosts as $host) {
    echo "Testing: $host\n";
    
    try {
        $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
        $pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 30
        ]);
        
        // Test a simple query
        $stmt = $pdo->query("SELECT 1 as test");
        $result = $stmt->fetch();
        
        if ($result['test'] == 1) {
            echo "✅ SUCCESS! Use this host: $host\n";
            echo "   Connection string: mysql:host=$host;port=$port;dbname=$dbname\n";
            echo "   Update your .env file with: DB_HOST=$host\n\n";
            break; // Stop on first success
        }
        
    } catch (PDOException $e) {
        echo "❌ Failed: " . $e->getMessage() . "\n\n";
    }
}

echo "💡 If none worked, check your Hostinger control panel for the correct database host.\n";
echo "   Look for 'Database Details' or 'MySQL Database' section.\n";
?>