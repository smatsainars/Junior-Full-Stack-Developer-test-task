<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use App\GraphQL\Schema;
use GraphQL\Error\DebugFlag;

class GraphQL
{
    public static function setEntityManager($em): void
    {
        Schema::setEntityManager($em);
    }

    public function handle()
    {
        try {

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

            $schema = Schema::build();

            $debug = DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE;
            $result = GraphQLBase::executeQuery(
                $schema,
                $query,
                rootValue: null,
                contextValue: null,
                variableValues: $variables
            );


            $output = $result->toArray($debug);

        } catch (\Exception $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]
                ]
            ];
        }

        return json_encode($output, JSON_PRETTY_PRINT);
    }
}
