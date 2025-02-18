<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends BaseType
{
    private static ?ObjectType $type = null;

    public static function get(): ObjectType
    {
        if (self::$type === null) {
            self::$type = new ObjectType([
                'name' => 'Category',
                'fields' => [
                    'name' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($category) => $category->getName()
                    ]
                ]
            ]);
        }
        return self::$type;
    }
}