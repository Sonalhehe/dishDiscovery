"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: number, quantity: number) => void;
  onPlaceOrder: () => void;
}

export function CartSheet({
  isOpen,
  onOpenChange,
  cartItems,
  onUpdateQuantity,
  onPlaceOrder,
}: CartSheetProps) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 py-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      data-ai-hint="dish food"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground">
              Add some delicious dishes to get started!
            </p>
          </div>
        )}
        <Separator />
        <SheetFooter>
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              disabled={cartItems.length === 0}
              onClick={onPlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
