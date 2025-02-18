<?php

namespace App\GraphQL\Types;

use Doctrine\ORM\EntityManager;

abstract class BaseType
{
    protected static ?EntityManager $entityManager = null;

    public static function setEntityManager(EntityManager $em)
    {
        self::$entityManager = $em;
    }
}