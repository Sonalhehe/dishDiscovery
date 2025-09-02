"use client";

import { useState } from "react";
import Link from "next/link";
import { DishCard } from "@/components/dish-card";
import { Icons } from "@/components/icons";
import { MenuFilters } from "@/components/menu-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { initialDishes } from "@/lib/dishes";
import type { FilteredDish, CartItem } from "@/types";
import { filterMenuItems } from "@/ai/flows/filter-menu-items-by-dietary-restrictions";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogOut } from "lucide-react";
import { placeOrder } from "@/app/actions/place-order";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const [dishes, setDishes] = useState<FilteredDish[]>(initialDishes);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleFilter = async (restrictions: string) => {
    if (!restrictions) {
      setDishes(initialDishes);
      return;
    }

    setIsLoading(true);

    try {
      const promises = initialDishes.map((dish) =>
        filterMenuItems({
          dishDescription: dish.description,
          dietaryRestrictions: restrictions,
        }).then((result) => ({ ...dish, ...result }))
      );

      const results = await Promise.all(promises);
      setDishes(results);
    } catch (error) {
      console.error("Failed to filter dishes:", error);
      toast({
        title: "Error",
        description: "Failed to filter dishes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setDishes(initialDishes);
  };

  const addToCart = (dish: FilteredDish) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (dishId: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity === 0) {
        return prevItems.filter((item) => item.id !== dishId);
      }
      return prevItems.map((item) =>
        item.id === dishId ? { ...item, quantity } : item
      );
    });
  };
  
  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await placeOrder(cartItems, user.uid);
      if (result.success) {
        toast({
          title: "Order Placed!",
          description: "Thank you for your order.",
        });
        setCartItems([]);
        setIsCartOpen(false);
      } else {
         toast({
          title: "Order Failed",
          description: result.error || "There was a problem placing your order. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      let errorMessage = "There was a problem placing your order. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Order Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center text-center mb-12">
        <div className="flex-1"></div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center gap-4 mb-2">
            <Icons.logo className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold font-headline tracking-tight text-yellow-900">
              Dish Discovery
            </h1>
          </div>
          <p className="text-lg text-yellow-800/80">
            Find the perfect meal that meets your dietary needs.
          </p>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
          {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                    <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </header>
      
      <CartSheet
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onPlaceOrder={handlePlaceOrder}
      />

      <main>
        <MenuFilters
          onFilter={handleFilter}
          onClear={clearFilters}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[225px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            : dishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onAddToCart={() => addToCart(dish)}
                />
              ))}
        </div>
      </main>
    </div>
  );
}
