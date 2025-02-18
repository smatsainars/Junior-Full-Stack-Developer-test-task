<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;
use App\Entity\Product;

class CartMutation extends BaseMutation
{
    public static function getFields(): array
    {
        return [
            'addToCart' => self::getAddToCartField(),
            'updateCartItem' => self::getUpdateCartItemField(),
            'removeFromCart' => self::getRemoveFromCartField()
        ];
    }

    private static function getAddToCartField(): array
    {
        return [
            'type' => Type::boolean(),
            'args' => [
                'productId' => Type::nonNull(Type::string()),
                'attributes' => Type::listOf(new InputObjectType([
                    'name' => 'AttributeInput',
                    'fields' => [
                        'name' => Type::nonNull(Type::string()),
                        'value' => Type::nonNull(Type::string())
                    ]
                ])),
                'quantity' => Type::nonNull(Type::int())
            ],
            'resolve' => function ($root, $args) {
                $product = self::$entityManager->find(Product::class, $args['productId']);
                if (!$product || !$product->getInStock()) {
                    throw new \Exception('Product not available');
                }
                return true;
            }
        ];
    }

    private static function getUpdateCartItemField(): array
    {
        return [
            'type' => Type::boolean(),
            'args' => [
                'productId' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int())
            ],
            'resolve' => function ($root, $args) {
                if ($args['quantity'] < 0) {
                    throw new \Exception('Invalid quantity');
                }
                return true;
            }
        ];
    }

    private static function getRemoveFromCartField(): array
    {
        return [
            'type' => Type::boolean(),
            'args' => [
                'productId' => Type::nonNull(Type::string())
            ],
            'resolve' => function ($root, $args) {
                return true;
            }
        ];
    }
}