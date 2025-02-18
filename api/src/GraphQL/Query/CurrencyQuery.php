<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use App\Entity\Product;
use App\GraphQL\Types\CurrencyType;

class CurrencyQuery extends BaseQuery
{
    public static function get(): array
    {
        return [
            'type' => CurrencyType::get(),
            'args' => [
                'id' => Type::nonNull(Type::string())
            ],
            'resolve' => function ($root, $args) {
                $product = self::$entityManager->getRepository(Product::class)
                    ->createQueryBuilder('p')
                    ->leftJoin('p.price', 'pr')
                    ->addSelect('pr')
                    ->where('p.id = :id')
                    ->setParameter('id', $args['id'])
                    ->getQuery()
                    ->getOneOrNullResult();

                if (!$product || !$product->getPrice()) {
                    return null;
                }

                $price = $product->getPrice();
                return [
                    'label' => $price->getCurrencyLabel(),
                    'symbol' => $price->getCurrencySymbol(),
                ];
            }
        ];
    }
}