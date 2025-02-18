<?php

namespace App\GraphQL\Query;

use Doctrine\ORM\EntityManager;

abstract class BaseQuery
{
    protected static ?EntityManager $entityManager = null;

    public static function setEntityManager(EntityManager $em)
    {
        self::$entityManager = $em;
    }
}