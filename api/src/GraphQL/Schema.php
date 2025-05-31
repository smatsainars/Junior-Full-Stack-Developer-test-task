<?php

namespace App\GraphQL;

use GraphQL\Type\Schema as GraphQLSchema;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Query\{CategoryQuery, ProductQuery, CurrencyQuery};
use App\GraphQL\Mutation\CartMutation;
use App\GraphQL\Mutation\OrderMutation;
use App\GraphQL\Types\BaseType;
use Doctrine\ORM\EntityManager;

class Schema
{
    private static ?EntityManager $entityManager = null;

    public static function setEntityManager(EntityManager $em): void
    {
        self::$entityManager = $em;
        BaseType::setEntityManager($em);
        Query\BaseQuery::setEntityManager($em);
        Mutation\BaseMutation::setEntityManager($em);
    }

    public static function build(): GraphQLSchema
    {
        if (self::$entityManager === null) {
            throw new \RuntimeException('EntityManager must be set before building schema');
        }

        return new GraphQLSchema([
            'query' => new ObjectType([
                'name' => 'Query',
                'fields' => function () {
                    return [
                        'categories' => CategoryQuery::get(),
                        'products' => ProductQuery::getList(),
                        'product' => ProductQuery::getOne(),
                        'currency' => CurrencyQuery::get(),
                    ];
                },
            ]),
            'mutation' => new ObjectType([
                'name' => 'Mutation',
                'fields' => function () {
                    return array_merge(
                        CartMutation::getFields(),
                        OrderMutation::getFields()
                    );
                },
            ]),
        ]);
    }
}
