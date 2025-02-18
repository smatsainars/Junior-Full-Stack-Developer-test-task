<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeItemType extends BaseType
{
    private static ?ObjectType $type = null;

    public static function get(): ObjectType
    {
        if (self::$type === null) {
            self::$type = new ObjectType([
                'name' => 'AttributeItem',
                'fields' => [
                    'displayValue' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($item) => $item->getDisplayValue()
                    ],
                    'value' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($item) => $item->getValue()
                    ],
                    'id' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($item) => $item->getItemId()
                    ]
                ]
            ]);
        }
        return self::$type;
    }
}