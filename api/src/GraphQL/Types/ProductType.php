<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends BaseType
{
    private static ?ObjectType $type = null;

    public static function get(): ObjectType
    {
        if (self::$type === null) {
            self::$type = new ObjectType([
                'name' => 'Product',
                'fields' => [
                    'id' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($product) => $product->getId()
                    ],
                    'name' => [
                        'type' => Type::nonNull(Type::string()),
                        'resolve' => fn($product) => $product->getName()
                    ],
                    'inStock' => [
                        'type' => Type::nonNull(Type::boolean()),
                        'resolve' => fn($product) => $product->getInStock()
                    ],
                    'gallery' => [
                        'type' => Type::listOf(Type::string()),
                        'resolve' => fn($product) => array_map(
                            fn($image) => $image->getUrl(),
                            $product->getGallery()->toArray()
                        )
                    ],
                    'description' => [
                        'type' => Type::string(),
                        'resolve' => fn($product) => $product->getDescription()
                    ],
                    'category' => [
                        'type' => Type::string(),
                        'resolve' => fn($product) => $product->getCategory()?->getName()
                    ],
                    'attributes' => [
                        'type' => Type::listOf(AttributeType::get()),
                        'resolve' => fn($product) => $product->getAttributes()->toArray()
                    ],
                    'prices' => [
                        'type' => Type::listOf(PriceType::get()),
                        'resolve' => function ($product) {
                            $price = $product->getPrice();
                            if (!$price) return [];
                            return [[
                                'amount' => $price->getAmount(),
                                'currency' => [
                                    'label' => $price->getCurrencyLabel(),
                                    'symbol' => $price->getCurrencySymbol()
                                ]
                            ]];
                        }
                    ],
                    'brand' => [
                        'type' => Type::string(),
                        'resolve' => fn($product) => $product->getBrand()
                    ]
                ]
            ]);
        }
        return self::$type;
    }
}