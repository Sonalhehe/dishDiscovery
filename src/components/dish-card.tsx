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
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface DishCardProps {
  dish: FilteredDish;
}

export function DishCard({ dish }: DishCardProps) {
  const isUnsuitable = dish.isSuitable === false;

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        isUnsuitable && "bg-neutral-100 opacity-60 grayscale"
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
        <CardTitle className="text-xl font-bold font-headline text-yellow-900 mb-1">
          {dish.name}
        </CardTitle>
        <CardDescription className="text-yellow-800/80">
          {dish.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Badge
          variant="secondary"
          className="text-lg font-semibold bg-amber-100 text-amber-800 border-amber-300"
        >
          ${dish.price.toFixed(2)}
        </Badge>
        {isUnsuitable && dish.problematicIngredients && (
          <div className="flex items-center gap-2 text-sm text-destructive font-medium p-2 rounded-md bg-red-50 border border-red-200">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="truncate">
              May contain: {dish.problematicIngredients}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
