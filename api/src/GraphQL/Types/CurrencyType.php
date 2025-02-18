<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CurrencyType extends BaseType
{
    private static ?ObjectType $type = null;

    public static function get(): ObjectType
    {
        if (self::$type === null) {
            self::$type = new ObjectType([
                'name' => 'Currency',
                'fields' => [
                    'label' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($currency) => $currency['label']
                    ],
                    'symbol' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($currency) => $currency['symbol']
                    ]
                ]
            ]);
        }
        return self::$type;
    }
}