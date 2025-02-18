<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use App\Entity\Category;
use App\GraphQL\Types\CategoryType;

class CategoryQuery extends BaseQuery
{
    public static function get(): array
    {
        return [
            'type' => Type::listOf(CategoryType::get()),
            'resolve' => fn() => self::$entityManager->getRepository(Category::class)->findAll()
        ];
    }
}