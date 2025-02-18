<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends BaseType
{
    private static ?ObjectType $type = null;

    public static function get(): ObjectType
    {
        if (self::$type === null) {
            self::$type = new ObjectType([
                'name' => 'Attribute',
                'fields' => [
                    'name' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($attr) => $attr->getName()
                    ],
                    'type' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($attr) => $attr->getType()
                    ],
                    'items' => [
                        'type' => Type::listOf(AttributeItemType::get()),
                        'resolve' => fn($attr) => $attr->getItems()->toArray()
                    ]
                ]
            ]);
        }
        return self::$type;
    }
}