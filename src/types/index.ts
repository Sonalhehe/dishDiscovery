export type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type FilteredDish = Dish & {
  isSuitable?: boolean;
  problematicIngredients?: string;
};

export type CartItem = FilteredDish & {
  quantity: number;
};
