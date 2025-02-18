<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use App\GraphQL\Schema;
use GraphQL\Error\DebugFlag;

class GraphQL
{
    // If you prefer, you can keep a static $entityManager here,
    // but it's simpler to store it in Schema directly.

    public static function setEntityManager($em): void
    {
        // Just pass the EM to the Schema
        Schema::setEntityManager($em);
    }

    // This is the method FastRoute calls for POST /graphql
    public function handle()
    {
        try {
            // 1) Read the GraphQL query from the request body
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new \RuntimeException('Failed to read input');
            }
            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? null;
            $variables = $input['variables'] ?? null;

            if ($query === null) {
                throw new \RuntimeException('No query provided');
            }

            // 2) Build the schema
            $schema = Schema::build();

            // 3) Execute the query
            $debug = DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE;
            $result = GraphQLBase::executeQuery(
                $schema,
                $query,
                rootValue: null,
                contextValue: null,
                variableValues: $variables
            );

            // 4) Convert result to an array
            $output = $result->toArray($debug);

        } catch (\Exception $e) {
            // If anything goes wrong, return an error
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]
                ]
            ];
        }

        // 5) Return JSON (as a string)
        return json_encode($output, JSON_PRETTY_PRINT);
    }
}
