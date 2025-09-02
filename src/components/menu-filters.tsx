"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, X } from "lucide-react";

interface MenuFiltersProps {
  onFilter: (restrictions: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export function MenuFilters({ onFilter, onClear, isLoading }: MenuFiltersProps) {
  const [restrictions, setRestrictions] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilter(restrictions);
  };

  const handleClear = () => {
    setRestrictions("");
    onClear();
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md border sticky top-4 z-10">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow relative">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="e.g., gluten-free, vegan, nut allergy..."
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            className="pl-10 h-12 text-base"
            aria-label="Dietary Restrictions"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isLoading || !restrictions}
            className="w-full sm:w-auto h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
          >
            {isLoading ? "Analyzing..." : "Apply AI Filter"}
          </Button>
          {restrictions && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-12 w-12"
              aria-label="Clear filters"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>
      <p className="text-xs text-muted-foreground mt-2 text-center sm:text-left">
        Our AI chef will analyze dishes based on your needs.
      </p>
    </div>
  );
}
