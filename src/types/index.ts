export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quality: 'fresh' | 'moderate' | 'processed';
  purchased: boolean;
  createdAt: Date;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  createdAt: Date;
  completedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'family';
}

export interface DashboardStats {
  weeklyFreshRatio: number;
  totalLists: number;
  healthyStreak: number;
  itemsByCategory: Record<string, number>;
  itemsByQuality: {
    fresh: number;
    moderate: number;
    processed: number;
  };
  weeklyTrend: Array<{
    date: string;
    freshRatio: number;
  }>;
}
