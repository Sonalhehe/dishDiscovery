"use client";

import { useState } from "react";
import { DishCard } from "@/components/dish-card";
import { Icons } from "@/components/icons";
import { MenuFilters } from "@/components/menu-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { initialDishes } from "@/lib/dishes";
import type { FilteredDish } from "@/types";
import { filterMenuItems } from "@/ai/flows/filter-menu-items-by-dietary-restrictions";

export default function Home() {
  const [dishes, setDishes] = useState<FilteredDish[]>(initialDishes);
  const [isLoading, setIsLoading] = useState(false);

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
      // Optionally, show a toast notification for the error
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setDishes(initialDishes);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-2">
          <Icons.logo className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-bold font-headline tracking-tight text-yellow-900">
            Dish Discovery
          </h1>
        </div>
        <p className="text-lg text-yellow-800/80">
          Find the perfect meal that meets your dietary needs.
        </p>
      </header>

      <main>
        <MenuFilters
          onFilter={handleFilter}
          onClear={clearFilters}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[225px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            : dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      </main>
    </div>
  );
}
