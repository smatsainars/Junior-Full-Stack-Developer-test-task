<?php

namespace App\GraphQL\Mutation;

use Doctrine\ORM\EntityManager;

abstract class BaseMutation
{
    protected static ?EntityManager $entityManager = null;

    public static function setEntityManager(EntityManager $em)
    {
        self::$entityManager = $em;
    }
}