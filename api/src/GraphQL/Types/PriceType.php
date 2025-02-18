<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends BaseType
{
    private static ?ObjectType $type = null;

    public static function get(): ObjectType
    {
        if (self::$type === null) {
            self::$type = new ObjectType([
                'name' => 'Price',
                'fields' => [
                    'amount' => [
                        'type' => Type::nonNull(Type::float()),
                        'resolve' => fn($price) => $price['amount']
                    ],
                    'currency' => [
                        'type' => Type::nonNull(CurrencyType::get()),
                        'resolve' => fn($price) => $price['currency']
                    ]
                ]
            ]);
        }
        return self::$type;
    }
}