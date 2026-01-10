"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  // Calcula a quantidade total de itens no carrinho
  const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <Button variant="outline" size="icon">
            <ShoppingBasketIcon />
          </Button>
          {/* Badge contador - só aparece quando há itens */}
          {totalItems > 0 && (
            <Badge
              className="absolute -right-2 -top-2 h-5 min-w-5 border-none px-1.5 text-white"
              style={{ backgroundColor: '#8e51ff' }}
            >
              {totalItems}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-5">
          {cartIsLoading && <div>Carregando...</div>}
          {cart?.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.productVariant.product.name}
              productVariantName={item.productVariant.name}
              productVariantImageUrl={item.productVariant.imageUrl}
              productVariantPriceInCents={item.productVariant.priceInCents}
              quantity={item.quantity}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// SERVER ACTION
