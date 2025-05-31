<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;
use App\Entity\Product;
use App\Entity\Order;
use App\Entity\OrderItem;

class OrderMutation extends BaseMutation
{
    private static $cartItemInputType;

    public static function getFields(): array
    {
        return [
            'createOrder' => [
                'type' => Type::listOf(Type::string()),
                'args' => [
                    'cartItems' => Type::nonNull(Type::listOf(self::getCartItemInputType()))
                ],
                'resolve' => function ($root, $args) {
                    $em = self::$entityManager;
                    
                    try {
                        if (empty($args['cartItems'])) {
                            throw new \Exception('Cart is empty');
                        }
                        
                        $productIds = array_map(function($item) { 
                            return $item['id']; 
                        }, $args['cartItems']);

                        $products = $em->createQueryBuilder()
                            ->select('p')
                            ->from(Product::class, 'p')
                            ->where('p.id IN (:ids)')
                            ->setParameter('ids', $productIds)
                            ->getQuery()
                            ->getResult();

                        $productMap = [];
                        foreach ($products as $product) {
                            $productMap[$product->getId()] = $product;
                        }

                        $order = new Order();
                        $totalAmount = 0;
                        $orderItems = [];

                        foreach ($args['cartItems'] as $cartItem) {
                            if (!isset($productMap[$cartItem['id']])) {
                                throw new \Exception('Product not found: ' . $cartItem['id']);
                            }

                            $product = $productMap[$cartItem['id']];
                            
                            if (!$product->getInStock()) {
                                throw new \Exception('Product out of stock: ' . $product->getName());
                            }
                            
                            if ($cartItem['quantity'] <= 0) {
                                throw new \Exception('Invalid quantity for product: ' . $product->getName());
                            }

                            $productPrice = $product->getPrice();
                            if (!$productPrice) {
                                throw new \Exception('No price found for product: ' . $product->getName());
                            }
                            
                            $price = (float)$productPrice->getAmount();
                            if ($price <= 0) {
                                throw new \Exception('Invalid price for product: ' . $product->getName());
                            }
                            
                            $lineTotal = $price * $cartItem['quantity'];
                            $totalAmount += $lineTotal;

                            $orderItem = new OrderItem();
                            $orderItem->setOrder($order);
                            $orderItem->setProduct($product);
                            $orderItem->setQuantity($cartItem['quantity']);
                            $orderItem->setPrice($price);
                            
                            if (!empty($cartItem['selectedAttributes'])) {
                                $orderItem->setAttributes($cartItem['selectedAttributes']);
                            }

                            $orderItems[] = $orderItem;
                            $order->addOrderItem($orderItem);
                        }

                        $order->setTotalAmount($totalAmount);
                        
                        $em->persist($order);
                        foreach ($orderItems as $orderItem) {
                            $em->persist($orderItem);
                        }
                        $em->flush();
                        
                        $result = [];
                        $result[] = "Order ID: " . $order->getId();
                        $result[] = "Status: " . $order->getStatus();
                        $result[] = "Items: " . count($orderItems);
                        
                        foreach ($orderItems as $orderItem) {
                            $product = $orderItem->getProduct();
                            $result[] = sprintf(
                                "- %s x%d @ $%.2f = $%.2f",
                                $product->getName(),
                                $orderItem->getQuantity(),
                                (float)$orderItem->getPrice(),
                                ((float)$orderItem->getPrice() * $orderItem->getQuantity())
                            );
                        }
                        
                        $result[] = "Total: $" . number_format($totalAmount, 2);
                        $result[] = "Order placed successfully!";
                        
                        return $result;

                    } catch (\Exception $e) {
                        error_log('Order creation failed: ' . $e->getMessage());
                        throw new \Exception('Failed to process order. Please try again.');
                    }
                }
            ]
        ];
    }

    private static function getCartItemInputType(): InputObjectType
    {
        if (!self::$cartItemInputType) {
            self::$cartItemInputType = new InputObjectType([
                'name' => 'CartItemInput',
                'fields' => [
                    'id' => Type::nonNull(Type::string()),
                    'quantity' => Type::nonNull(Type::int()),
                    'selectedAttributes' => [
                        'type' => Type::string(),
                        'description' => 'Selected attributes as JSON string',
                        'defaultValue' => '{}'
                    ]
                ]
            ]);
        }
        return self::$cartItemInputType;
    }
}