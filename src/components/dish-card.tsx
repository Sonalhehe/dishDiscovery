import Image from "next/image";
import type { FilteredDish } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

interface DishCardProps {
  dish: FilteredDish;
  onAddToCart: () => void;
}

export function DishCard({ dish, onAddToCart }: DishCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      )}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            data-ai-hint="dish food"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-bold font-headline mb-1">
          {dish.name}
        </CardTitle>
        <CardDescription>
          {dish.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch p-4 pt-0 gap-4">
        <div className="flex justify-between items-center">
          <Badge
            variant="secondary"
            className="text-lg font-semibold bg-amber-100 text-amber-800 border-amber-300"
          >
            ₹{dish.price.toFixed(2)}
          </Badge>
        </div>
        <Button onClick={onAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
