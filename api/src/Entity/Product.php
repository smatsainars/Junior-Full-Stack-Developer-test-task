<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "products")]
class Product
{
    #[ORM\Id]
    #[ORM\Column(type: "string", length: 36)]
    private string $id;

    #[ORM\Column(type: "string", length: 255)]
    private string $name;

    #[ORM\Column(type: "boolean")]
    private bool $inStock;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description;

    #[ORM\Column(type: "string", length: 255)]
    private string $brand;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(name: "category_id", referencedColumnName: "id", nullable: true)]
    private ?Category $category = null;

    #[ORM\OneToMany(targetEntity: ProductImage::class, mappedBy: "product", cascade: ["persist", "remove"])]
    private Collection $gallery;

    #[ORM\OneToMany(targetEntity: ProductAttribute::class, mappedBy: "product", cascade: ["persist", "remove"])]
    private Collection $attributes;

    #[ORM\OneToOne(targetEntity: ProductPrice::class, mappedBy: "product", cascade: ["persist", "remove"])]
    private ?ProductPrice $price = null;

    public function __construct()
    {
        $this->gallery = new ArrayCollection();
        $this->attributes = new ArrayCollection();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
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

    public function getInStock(): bool
    {
        return $this->inStock;
    }

    public function setInStock(bool $inStock): void
    {
        $this->inStock = $inStock;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getBrand(): string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): void
    {
        $this->brand = $brand;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): void
    {
        $this->category = $category;
    }

    public function getGallery(): Collection
    {
        return $this->gallery;
    }

    public function addGalleryImage(ProductImage $image): void
    {
        if (!$this->gallery->contains(element: $image)) {
            $this->gallery->add(element: $image);
            $image->setProduct(product: $this);
        }
    }

    public function removeGalleryImage(ProductImage $image): void
    {
        if ($this->gallery->removeElement(element: $image)) {
            if ($image->getProduct() === $this) {
                $image->setProduct(product: null);
            }
        }
    }

    public function getAttributes(): Collection
    {
        return $this->attributes;
    }

    public function addAttribute(ProductAttribute $attribute): void
    {
        if (!$this->attributes->contains(element: $attribute)) {
            $this->attributes->add(element: $attribute);
            $attribute->setProduct(product: $this);
        }
    }

    public function removeAttribute(ProductAttribute $attribute): void
    {
        if ($this->attributes->removeElement(element: $attribute)) {
            if ($attribute->getProduct() === $this) {
                $attribute->setProduct(product: null);
            }
        }
    }

    public function getPrice(): ?ProductPrice
    {
        return $this->price;
    }

    public function setPrice(?ProductPrice $price): void
    {
        $this->price = $price;
        if ($price !== null) {
            $price->setProduct(product: $this);
        }
    }
}