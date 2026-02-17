export type FoodSuggestion = {
  name: string;
  category: 'Produce' | 'Protein' | 'Dairy' | 'Grains' | 'Snacks' | 'Drinks';
  quality: 'fresh' | 'moderate' | 'processed';
};

export const FOODS: FoodSuggestion[] = [
  // Produce - Fresh
  { name: "Organic Spinach", category: "Produce", quality: "fresh" },
  { name: "Kale", category: "Produce", quality: "fresh" },
  { name: "Arugula", category: "Produce", quality: "fresh" },
  { name: "Mixed Greens", category: "Produce", quality: "fresh" },
  { name: "Romaine Lettuce", category: "Produce", quality: "fresh" },
  { name: "Broccoli", category: "Produce", quality: "fresh" },
  { name: "Cauliflower", category: "Produce", quality: "fresh" },
  { name: "Brussels Sprouts", category: "Produce", quality: "fresh" },
  { name: "Carrots", category: "Produce", quality: "fresh" },
  { name: "Bell Peppers", category: "Produce", quality: "fresh" },
  { name: "Tomatoes", category: "Produce", quality: "fresh" },
  { name: "Cherry Tomatoes", category: "Produce", quality: "fresh" },
  { name: "Cucumbers", category: "Produce", quality: "fresh" },
  { name: "Zucchini", category: "Produce", quality: "fresh" },
  { name: "Yellow Squash", category: "Produce", quality: "fresh" },
  { name: "Eggplant", category: "Produce", quality: "fresh" },
  { name: "Asparagus", category: "Produce", quality: "fresh" },
  { name: "Green Beans", category: "Produce", quality: "fresh" },
  { name: "Sweet Potatoes", category: "Produce", quality: "fresh" },
  { name: "Red Potatoes", category: "Produce", quality: "fresh" },
  { name: "Russet Potatoes", category: "Produce", quality: "fresh" },
  { name: "Red Onions", category: "Produce", quality: "fresh" },
  { name: "Yellow Onions", category: "Produce", quality: "fresh" },
  { name: "Garlic", category: "Produce", quality: "fresh" },
  { name: "Ginger Root", category: "Produce", quality: "fresh" },
  { name: "Mushrooms", category: "Produce", quality: "fresh" },
  { name: "Shiitake Mushrooms", category: "Produce", quality: "fresh" },
  { name: "Avocados", category: "Produce", quality: "fresh" },
  { name: "Bananas", category: "Produce", quality: "fresh" },
  { name: "Apples", category: "Produce", quality: "fresh" },
  { name: "Oranges", category: "Produce", quality: "fresh" },
  { name: "Grapes", category: "Produce", quality: "fresh" },
  { name: "Strawberries", category: "Produce", quality: "fresh" },
  { name: "Blueberries", category: "Produce", quality: "fresh" },
  { name: "Raspberries", category: "Produce", quality: "fresh" },
  { name: "Blackberries", category: "Produce", quality: "fresh" },
  { name: "Mangoes", category: "Produce", quality: "fresh" },
  { name: "Pineapple", category: "Produce", quality: "fresh" },
  { name: "Watermelon", category: "Produce", quality: "fresh" },
  { name: "Cantaloupe", category: "Produce", quality: "fresh" },
  { name: "Honeydew Melon", category: "Produce", quality: "fresh" },
  { name: "Peaches", category: "Produce", quality: "fresh" },
  { name: "Plums", category: "Produce", quality: "fresh" },
  { name: "Nectarines", category: "Produce", quality: "fresh" },
  { name: "Pears", category: "Produce", quality: "fresh" },
  { name: "Lemons", category: "Produce", quality: "fresh" },
  { name: "Limes", category: "Produce", quality: "fresh" },
  { name: "Kiwi", category: "Produce", quality: "fresh" },
  { name: "Pomegranate", category: "Produce", quality: "fresh" },
  { name: "Fresh Herbs (Basil)", category: "Produce", quality: "fresh" },
  { name: "Fresh Herbs (Cilantro)", category: "Produce", quality: "fresh" },
  { name: "Fresh Herbs (Parsley)", category: "Produce", quality: "fresh" },
  { name: "Fresh Herbs (Mint)", category: "Produce", quality: "fresh" },

  // Protein - Fresh
  { name: "Chicken Breast", category: "Protein", quality: "fresh" },
  { name: "Chicken Thighs", category: "Protein", quality: "fresh" },
  { name: "Ground Turkey", category: "Protein", quality: "fresh" },
  { name: "Turkey Breast", category: "Protein", quality: "fresh" },
  { name: "Wild Salmon", category: "Protein", quality: "fresh" },
  { name: "Cod Fillets", category: "Protein", quality: "fresh" },
  { name: "Tilapia", category: "Protein", quality: "fresh" },
  { name: "Shrimp", category: "Protein", quality: "fresh" },
  { name: "Scallops", category: "Protein", quality: "fresh" },
  { name: "Tuna Steaks", category: "Protein", quality: "fresh" },
  { name: "Ground Beef (Grass-Fed)", category: "Protein", quality: "fresh" },
  { name: "Beef Sirloin", category: "Protein", quality: "fresh" },
  { name: "Pork Chops", category: "Protein", quality: "fresh" },
  { name: "Pork Tenderloin", category: "Protein", quality: "fresh" },
  { name: "Eggs (Free-Range)", category: "Protein", quality: "fresh" },
  { name: "Tofu (Firm)", category: "Protein", quality: "fresh" },
  { name: "Tempeh", category: "Protein", quality: "fresh" },
  { name: "Lamb Chops", category: "Protein", quality: "fresh" },

  // Protein - Moderate
  { name: "Canned Tuna", category: "Protein", quality: "moderate" },
  { name: "Canned Salmon", category: "Protein", quality: "moderate" },
  { name: "Rotisserie Chicken", category: "Protein", quality: "moderate" },
  { name: "Deli Turkey (Low Sodium)", category: "Protein", quality: "moderate" },
  { name: "Deli Chicken", category: "Protein", quality: "moderate" },
  { name: "Frozen Chicken Breast", category: "Protein", quality: "moderate" },
  { name: "Smoked Salmon", category: "Protein", quality: "moderate" },

  // Protein - Processed
  { name: "Hot Dogs", category: "Protein", quality: "processed" },
  { name: "Bacon", category: "Protein", quality: "processed" },
  { name: "Sausages", category: "Protein", quality: "processed" },
  { name: "Deli Salami", category: "Protein", quality: "processed" },
  { name: "Bologna", category: "Protein", quality: "processed" },
  { name: "Chicken Nuggets", category: "Protein", quality: "processed" },
  { name: "Fish Sticks", category: "Protein", quality: "processed" },

  // Dairy - Fresh
  { name: "Greek Yogurt (Plain)", category: "Dairy", quality: "fresh" },
  { name: "Cottage Cheese", category: "Dairy", quality: "fresh" },
  { name: "Mozzarella (Fresh)", category: "Dairy", quality: "fresh" },
  { name: "Feta Cheese", category: "Dairy", quality: "fresh" },
  { name: "Goat Cheese", category: "Dairy", quality: "fresh" },
  { name: "Ricotta Cheese", category: "Dairy", quality: "fresh" },

  // Dairy - Moderate
  { name: "Milk (Whole)", category: "Dairy", quality: "moderate" },
  { name: "Milk (2%)", category: "Dairy", quality: "moderate" },
  { name: "Almond Milk", category: "Dairy", quality: "moderate" },
  { name: "Oat Milk", category: "Dairy", quality: "moderate" },
  { name: "Soy Milk", category: "Dairy", quality: "moderate" },
  { name: "Coconut Milk", category: "Dairy", quality: "moderate" },
  { name: "Butter", category: "Dairy", quality: "moderate" },
  { name: "Cream Cheese", category: "Dairy", quality: "moderate" },
  { name: "Sour Cream", category: "Dairy", quality: "moderate" },
  { name: "Cheddar Cheese", category: "Dairy", quality: "moderate" },
  { name: "Swiss Cheese", category: "Dairy", quality: "moderate" },
  { name: "Parmesan Cheese", category: "Dairy", quality: "moderate" },
  { name: "Provolone Cheese", category: "Dairy", quality: "moderate" },
  { name: "Greek Yogurt (Flavored)", category: "Dairy", quality: "moderate" },
  { name: "Kefir", category: "Dairy", quality: "moderate" },

  // Dairy - Processed
  { name: "American Cheese Slices", category: "Dairy", quality: "processed" },
  { name: "Cheese Whiz", category: "Dairy", quality: "processed" },
  { name: "Flavored Coffee Creamer", category: "Dairy", quality: "processed" },
  { name: "Ice Cream", category: "Dairy", quality: "processed" },
  { name: "Frozen Yogurt", category: "Dairy", quality: "processed" },

  // Grains - Fresh
  { name: "Quinoa", category: "Grains", quality: "fresh" },
  { name: "Brown Rice", category: "Grains", quality: "fresh" },
  { name: "Wild Rice", category: "Grains", quality: "fresh" },
  { name: "Steel-Cut Oats", category: "Grains", quality: "fresh" },
  { name: "Rolled Oats", category: "Grains", quality: "fresh" },
  { name: "Barley", category: "Grains", quality: "fresh" },
  { name: "Farro", category: "Grains", quality: "fresh" },
  { name: "Bulgur", category: "Grains", quality: "fresh" },
  { name: "Millet", category: "Grains", quality: "fresh" },
  { name: "Buckwheat", category: "Grains", quality: "fresh" },

  // Grains - Moderate
  { name: "Whole Grain Bread", category: "Grains", quality: "moderate" },
  { name: "Sourdough Bread", category: "Grains", quality: "moderate" },
  { name: "Whole Wheat Tortillas", category: "Grains", quality: "moderate" },
  { name: "Whole Wheat Pasta", category: "Grains", quality: "moderate" },
  { name: "Brown Rice Pasta", category: "Grains", quality: "moderate" },
  { name: "Whole Grain Crackers", category: "Grains", quality: "moderate" },
  { name: "Pita Bread (Whole Wheat)", category: "Grains", quality: "moderate" },
  { name: "English Muffins (Whole Grain)", category: "Grains", quality: "moderate" },
  { name: "Bagels (Whole Grain)", category: "Grains", quality: "moderate" },
  { name: "Corn Tortillas", category: "Grains", quality: "moderate" },
  { name: "Rice Cakes", category: "Grains", quality: "moderate" },
  { name: "Couscous", category: "Grains", quality: "moderate" },

  // Grains - Processed
  { name: "White Bread", category: "Grains", quality: "processed" },
  { name: "White Rice", category: "Grains", quality: "processed" },
  { name: "White Pasta", category: "Grains", quality: "processed" },
  { name: "Instant Ramen", category: "Grains", quality: "processed" },
  { name: "Pop-Tarts", category: "Grains", quality: "processed" },
  { name: "Donuts", category: "Grains", quality: "processed" },
  { name: "Croissants", category: "Grains", quality: "processed" },
  { name: "Bagels (White)", category: "Grains", quality: "processed" },
  { name: "Pancake Mix", category: "Grains", quality: "processed" },

  // Snacks - Fresh
  { name: "Raw Almonds", category: "Snacks", quality: "fresh" },
  { name: "Raw Cashews", category: "Snacks", quality: "fresh" },
  { name: "Raw Walnuts", category: "Snacks", quality: "fresh" },
  { name: "Raw Pecans", category: "Snacks", quality: "fresh" },
  { name: "Pistachios (Unsalted)", category: "Snacks", quality: "fresh" },
  { name: "Pumpkin Seeds", category: "Snacks", quality: "fresh" },
  { name: "Sunflower Seeds", category: "Snacks", quality: "fresh" },
  { name: "Chia Seeds", category: "Snacks", quality: "fresh" },
  { name: "Flax Seeds", category: "Snacks", quality: "fresh" },
  { name: "Hemp Hearts", category: "Snacks", quality: "fresh" },
  { name: "Dates", category: "Snacks", quality: "fresh" },
  { name: "Dried Apricots (Unsweetened)", category: "Snacks", quality: "fresh" },
  { name: "Raisins (Unsweetened)", category: "Snacks", quality: "fresh" },

  // Snacks - Moderate
  { name: "Hummus", category: "Snacks", quality: "moderate" },
  { name: "Guacamole", category: "Snacks", quality: "moderate" },
  { name: "Salsa", category: "Snacks", quality: "moderate" },
  { name: "Peanut Butter (Natural)", category: "Snacks", quality: "moderate" },
  { name: "Almond Butter", category: "Snacks", quality: "moderate" },
  { name: "Cashew Butter", category: "Snacks", quality: "moderate" },
  { name: "Trail Mix (No Added Sugar)", category: "Snacks", quality: "moderate" },
  { name: "Popcorn (Air-Popped)", category: "Snacks", quality: "moderate" },
  { name: "Dark Chocolate (70%+)", category: "Snacks", quality: "moderate" },
  { name: "Granola Bars (Low Sugar)", category: "Snacks", quality: "moderate" },
  { name: "Protein Bars", category: "Snacks", quality: "moderate" },
  { name: "Rice Crackers", category: "Snacks", quality: "moderate" },
  { name: "Seaweed Snacks", category: "Snacks", quality: "moderate" },
  { name: "Dried Edamame", category: "Snacks", quality: "moderate" },
  { name: "Beef Jerky (Low Sodium)", category: "Snacks", quality: "moderate" },

  // Snacks - Processed
  { name: "Potato Chips", category: "Snacks", quality: "processed" },
  { name: "Tortilla Chips", category: "Snacks", quality: "processed" },
  { name: "Cheetos", category: "Snacks", quality: "processed" },
  { name: "Doritos", category: "Snacks", quality: "processed" },
  { name: "Pretzels", category: "Snacks", quality: "processed" },
  { name: "Cookies", category: "Snacks", quality: "processed" },
  { name: "Oreos", category: "Snacks", quality: "processed" },
  { name: "Candy Bars", category: "Snacks", quality: "processed" },
  { name: "Gummy Bears", category: "Snacks", quality: "processed" },
  { name: "Skittles", category: "Snacks", quality: "processed" },
  { name: "M&Ms", category: "Snacks", quality: "processed" },
  { name: "Fruit Roll-Ups", category: "Snacks", quality: "processed" },
  { name: "Goldfish Crackers", category: "Snacks", quality: "processed" },
  { name: "Cheese Puffs", category: "Snacks", quality: "processed" },
  { name: "Microwave Popcorn (Butter)", category: "Snacks", quality: "processed" },

  // Drinks - Fresh
  { name: "Fresh Squeezed Orange Juice", category: "Drinks", quality: "fresh" },
  { name: "Cold-Pressed Juice", category: "Drinks", quality: "fresh" },
  { name: "Coconut Water", category: "Drinks", quality: "fresh" },
  { name: "Herbal Tea", category: "Drinks", quality: "fresh" },
  { name: "Green Tea", category: "Drinks", quality: "fresh" },
  { name: "Black Tea", category: "Drinks", quality: "fresh" },

  // Drinks - Moderate
  { name: "Kombucha", category: "Drinks", quality: "moderate" },
  { name: "Sparkling Water", category: "Drinks", quality: "moderate" },
  { name: "Coffee (Black)", category: "Drinks", quality: "moderate" },
  { name: "Unsweetened Iced Tea", category: "Drinks", quality: "moderate" },
  { name: "Milk (Plain)", category: "Drinks", quality: "moderate" },
  { name: "Almond Milk (Unsweetened)", category: "Drinks", quality: "moderate" },
  { name: "100% Fruit Juice", category: "Drinks", quality: "moderate" },
  { name: "Vegetable Juice", category: "Drinks", quality: "moderate" },
  { name: "Protein Shakes (Natural)", category: "Drinks", quality: "moderate" },

  // Drinks - Processed
  { name: "Soda (Regular)", category: "Drinks", quality: "processed" },
  { name: "Diet Soda", category: "Drinks", quality: "processed" },
  { name: "Energy Drinks", category: "Drinks", quality: "processed" },
  { name: "Sports Drinks (Gatorade)", category: "Drinks", quality: "processed" },
  { name: "Sweetened Iced Tea", category: "Drinks", quality: "processed" },
  { name: "Fruit Punch", category: "Drinks", quality: "processed" },
  { name: "Lemonade (Sweetened)", category: "Drinks", quality: "processed" },
  { name: "Flavored Coffee Drinks", category: "Drinks", quality: "processed" },
  { name: "Hot Chocolate Mix", category: "Drinks", quality: "processed" },
  { name: "Kool-Aid", category: "Drinks", quality: "processed" },
];

// Helper function to search foods
export function searchFoods(query: string, limit: number = 10): FoodSuggestion[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return FOODS
    .filter(food => food.name.toLowerCase().includes(lowerQuery))
    .slice(0, limit);
}

// Get random foods for demo data
export function getRandomFoods(count: number = 9): FoodSuggestion[] {
  const shuffled = [...FOODS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get foods by category
export function getFoodsByCategory(category: FoodSuggestion['category']): FoodSuggestion[] {
  return FOODS.filter(food => food.category === category);
}

// Get foods by quality
export function getFoodsByQuality(quality: FoodSuggestion['quality']): FoodSuggestion[] {
  return FOODS.filter(food => food.quality === quality);
}
