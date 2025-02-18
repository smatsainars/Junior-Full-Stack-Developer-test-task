<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "attribute_items")]
#[ORM\UniqueConstraint(
    name: "unique_item_per_attribute",
    columns: ["attribute_id", "item_id"]
)]
class AttributeItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private int $id;

    #[ORM\Column(type: "string", length: 255)]
    private string $displayValue;

    #[ORM\Column(type: "string", length: 255)]
    private string $value;

    #[ORM\Column(name: "item_id", type: "string", length: 36)]
    private string $itemId;

    #[ORM\ManyToOne(targetEntity: ProductAttribute::class, inversedBy: "items")]
    #[ORM\JoinColumn(name: "attribute_id", referencedColumnName: "id", nullable: false)]
    private ?ProductAttribute $attribute = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function getDisplayValue(): string
    {
        return $this->displayValue;
    }

    public function setDisplayValue(string $displayValue): void
    {
        $this->displayValue = $displayValue;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function setValue(string $value): void
    {
        $this->value = $value;
    }

    public function getItemId(): string
    {
        return $this->itemId;
    }

    public function setItemId(string $itemId): void
    {
        $this->itemId = $itemId;
    }

    public function getAttribute(): ?ProductAttribute
    {
        return $this->attribute;
    }

    public function setAttribute(?ProductAttribute $attribute): void
    {
        $this->attribute = $attribute;
    }
}