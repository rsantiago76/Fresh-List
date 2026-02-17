import { GroceryItem } from '../types';

export const calculateFreshRatio = (items: GroceryItem[]): number => {
  if (items.length === 0) return 0;
  const freshCount = items.filter(item => item.quality === 'fresh').length;
  return Math.round((freshCount / items.length) * 100);
};

export const getSuggestions = (items: GroceryItem[]): Array<{
  id: string;
  title: string;
  description: string;
  emoji: string;
  type: 'success' | 'info' | 'warning';
}> => {
  const suggestions = [];
  const freshRatio = calculateFreshRatio(items);
  
  const categoryCount = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const qualityCount = {
    fresh: items.filter(i => i.quality === 'fresh').length,
    moderate: items.filter(i => i.quality === 'moderate').length,
    processed: items.filter(i => i.quality === 'processed').length,
  };

  // Fresh ratio suggestions
  if (freshRatio >= 70) {
    suggestions.push({
      id: 'excellent',
      title: 'Excellent Choices!',
      description: `Your list has ${freshRatio}% fresh items. You're doing amazing!`,
      emoji: '🎉',
      type: 'success' as const,
    });
  } else if (freshRatio >= 50) {
    suggestions.push({
      id: 'balance',
      title: 'Great Balance',
      description: 'Add 2-3 more fresh items to reach 70% and unlock the "Fresh Champion" badge.',
      emoji: '🥬',
      type: 'info' as const,
    });
  } else if (freshRatio >= 30) {
    suggestions.push({
      id: 'improve',
      title: 'Room for Improvement',
      description: 'Try adding leafy greens, fresh fruits, or lean proteins to boost your ratio.',
      emoji: '💚',
      type: 'warning' as const,
    });
  } else if (items.length > 0) {
    suggestions.push({
      id: 'start',
      title: 'Let\'s Add Some Fresh Foods',
      description: 'Fresh produce and lean proteins are great starting points!',
      emoji: '🌱',
      type: 'warning' as const,
    });
  }

  // Category suggestions
  if (!categoryCount['Produce'] || categoryCount['Produce'] < 3) {
    suggestions.push({
      id: 'vegetables',
      title: 'Add More Vegetables',
      description: 'Aim for 3-5 servings of vegetables daily. Try adding spinach, broccoli, or bell peppers.',
      emoji: '🥦',
      type: 'info' as const,
    });
  }

  if (!categoryCount['Protein'] || categoryCount['Protein'] < 2) {
    suggestions.push({
      id: 'protein',
      title: 'Boost Your Protein',
      description: 'Include lean proteins like chicken, fish, eggs, or legumes.',
      emoji: '🍗',
      type: 'info' as const,
    });
  }

  // Processed food warning
  if (qualityCount.processed >= 5) {
    suggestions.push({
      id: 'processed',
      title: 'Too Many Processed Items',
      description: `You have ${qualityCount.processed} ultra-processed items. Consider swapping some for whole food alternatives.`,
      emoji: '⚠️',
      type: 'warning' as const,
    });
  }

  // Encouragement
  if (items.length >= 10 && freshRatio >= 60) {
    suggestions.push({
      id: 'progress',
      title: 'Awesome Progress!',
      description: 'You\'re building healthy habits. Keep up the great work!',
      emoji: '🌟',
      type: 'success' as const,
    });
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
};

export const groupItemsByQuality = (items: GroceryItem[]) => {
  return {
    fresh: items.filter(item => item.quality === 'fresh'),
    moderate: items.filter(item => item.quality === 'moderate'),
    processed: items.filter(item => item.quality === 'processed'),
  };
};

export const getInsightMessage = (freshRatio: number, totalItems: number): {
  emoji: string;
  title: string;
  message: string;
} => {
  if (totalItems === 0) {
    return {
      emoji: '🛒',
      title: 'Ready to Start',
      message: 'Add your first item to begin building a healthier grocery list!',
    };
  }
  if (freshRatio >= 70) {
    return {
      emoji: '🎉',
      title: 'Excellent Choices!',
      message: 'Your list is packed with fresh, whole foods. You\'re doing amazing!',
    };
  }
  if (freshRatio >= 50) {
    return {
      emoji: '👍',
      title: 'Great Balance',
      message: 'You\'re making thoughtful decisions. Keep up the good work!',
    };
  }
  if (freshRatio >= 30) {
    return {
      emoji: '🥬',
      title: 'Good Start',
      message: 'Consider adding more fresh produce to boost your ratio.',
    };
  }
  return {
    emoji: '💚',
    title: 'Every Step Counts',
    message: 'Small changes add up! Try swapping one item for something fresher.',
  };
};
