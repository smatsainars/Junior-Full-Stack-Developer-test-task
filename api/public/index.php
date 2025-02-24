<?php

require_once __DIR__ . '/../vendor/autoload.php';

use FastRoute\RouteCollector;
use FastRoute\Dispatcher;
use function FastRoute\simpleDispatcher;
use App\Controller\GraphQL;


// CORS Headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

// 2) Get the EntityManager (from bootstrap.php)
$entityManager = require __DIR__ . '/../config/bootstrap.php';

// 3) Pass the EntityManager to our GraphQL controller
GraphQL::setEntityManager($entityManager);

// 4) Define FastRoute routes
$dispatcher = simpleDispatcher(function (RouteCollector $r) {
    $r->addRoute('POST', '/graphql', [GraphQL::class, 'handle']);
});

// 5) Dispatch the current request
$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

switch ($routeInfo[0]) {
    case Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo json_encode(["error" => "404 Not Found"]);
        break;

    case Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo json_encode(["error" => "405 Method Not Allowed"]);
        break;

    case Dispatcher::FOUND:
        [$class, $method] = $routeInfo[1];
        $vars = $routeInfo[2];

        if (class_exists($class) && method_exists($class, $method)) {
            $response = (new $class())->$method($vars);
            echo $response;
        } else {
            http_response_code(500);
            echo json_encode(["error" => "500 Internal Server Error"]);
        }
        break;
}