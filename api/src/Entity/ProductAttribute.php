<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "product_attributes")]
class ProductAttribute
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private int $id;

    #[ORM\Column(type: "string", length: 255)]
    private string $name;

    #[ORM\Column(type: "string", length: 50)]
    private string $type;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: "attributes")]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\OneToMany(targetEntity: AttributeItem::class, mappedBy: "attribute", cascade: ["persist", "remove"])]
    private Collection $items;

    public function __construct()
    {
        $this->items = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): void
    {
        $this->product = $product;
    }

    public function getItems(): Collection
    {
        return $this->items;
    }

    public function addItem(AttributeItem $item): void
    {
        if (!$this->items->contains(element: $item)) {
            $this->items->add(element: $item);
            $item->setAttribute(attribute: $this);
        }
    }

    public function removeItem(AttributeItem $item): void
    {
        if ($this->items->removeElement(element: $item)) {
            if ($item->getAttribute() === $this) {
                $item->setAttribute(attribute: null);
            }
        }
    }
}