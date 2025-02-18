<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use App\Entity\Product;
use App\GraphQL\Types\ProductType;

class ProductQuery extends BaseQuery
{
    public static function getList(): array
    {
        return [
            'type' => Type::listOf(ProductType::get()),
            'args' => [
                'category' => Type::string(),
                'search' => Type::string()
            ],
            'resolve' => function ($root, $args) {
                $qb = self::$entityManager->createQueryBuilder();
                $qb->select('p, c, g, a, ai, pr')
                   ->from(Product::class, 'p')
                   ->leftJoin('p.category', 'c')
                   ->leftJoin('p.gallery', 'g')
                   ->leftJoin('p.attributes', 'a')
                   ->leftJoin('a.items', 'ai')
                   ->leftJoin('p.price', 'pr');

                if (!empty($args['category']) && $args['category'] !== 'all') {
                    $qb->andWhere('LOWER(c.name) = LOWER(:category)')
                       ->setParameter('category', $args['category']);
                }

                if (!empty($args['search'])) {
                    $qb->andWhere('LOWER(p.name) LIKE LOWER(:search)')
                       ->setParameter('search', '%' . $args['search'] . '%');
                }

                $qb->addOrderBy('p.name', 'ASC');

                return $qb->getQuery()->getResult();
            }
        ];
    }

    public static function getOne(): array
    {
        return [
            'type' => ProductType::get(),
            'args' => [
                'id' => Type::nonNull(Type::string())
            ],
            'resolve' => function ($root, $args) {
                return self::$entityManager->getRepository(Product::class)
                    ->createQueryBuilder('p')
                    ->select('p, c, g, a, ai, pr')
                    ->leftJoin('p.category', 'c')
                    ->leftJoin('p.gallery', 'g')
                    ->leftJoin('p.attributes', 'a')
                    ->leftJoin('a.items', 'ai')
                    ->leftJoin('p.price', 'pr')
                    ->where('p.id = :id')
                    ->setParameter('id', $args['id'])
                    ->getQuery()
                    ->getOneOrNullResult();
            }
        ];
    }
}