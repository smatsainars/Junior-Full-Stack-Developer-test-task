<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: "categories")]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private int $id;

    #[ORM\Column(type: "string", unique: true)]
    private string $name;

    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: "category")]
    private Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): void
    {
        if (!$this->products->contains(element: $product)) {
            $this->products->add(element: $product);
            $product->setCategory($this);
        }
    }

    public function removeProduct(Product $product): void
    {
        if ($this->products->removeElement(element: $product)) {
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }
    }
}